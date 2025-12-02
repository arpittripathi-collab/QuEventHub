// backend/routes/clubRoutes.js
import express from "express";
import { db, auth } from "../database/db.js"; // db is admin.firestore()
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Helper: build Firestore query with optional filters
router.get("/", async (req, res) => {
  try {
    const { type, q } = req.query;
    let snapshot;

    let ref = db.collection("clubs");
    if (type) ref = ref.where("category", "==", type.toLowerCase());
    if (q) {
      // Simple search: name contains (Firestore has limitations; for production use Algolia/Elastic)
      snapshot = await ref.get();
      const clubs = snapshot.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter(
          (c) =>
            c.name?.toLowerCase().includes(q.toLowerCase()) ||
            c.description?.toLowerCase().includes(q.toLowerCase())
        );
      return res.json({ data: clubs });
    } else {
      snapshot = await ref.get();
      const clubs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      return res.json({ data: clubs });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Create club (admin)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const payload = {
      ...req.body,
      category: (req.body.category || "general").toLowerCase(),
      createdAt: new Date().toISOString(),
      members: req.body.members || [],
    };
    const ref = await db.collection("clubs").add(payload);
    res.json({ id: ref.id, ...payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get club details
router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("clubs").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: "Club not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Update club (admin)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    await db.collection("clubs").doc(req.params.id).update(req.body);
    const updated = await db.collection("clubs").doc(req.params.id).get();
    res.json({ id: updated.id, ...updated.data() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Delete club (admin)
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    await db.collection("clubs").doc(req.params.id).delete();
    res.json({ message: "Club deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Join club (student) — transaction-safe
router.post("/:id/join", verifyToken, async (req, res) => {
  const clubRef = db.collection("clubs").doc(req.params.id);
  const userRef = db.collection("users").doc(req.user.uid);

  try {
    await db.runTransaction(async (t) => {
      const clubDoc = await t.get(clubRef);
      if (!clubDoc.exists) throw new Error("Club not found");

      const clubData = clubDoc.data();
      const members = Array.isArray(clubData.members) ? clubData.members : [];
      if (members.includes(req.user.uid)) throw new Error("Already a member");

      members.push(req.user.uid);
      t.update(clubRef, { members });

      // add to user's joinedClubs
      const userDoc = await t.get(userRef);
      const udata = userDoc.exists ? userDoc.data() : {};
      const joinedClubs = Array.isArray(udata.joinedClubs) ? udata.joinedClubs : [];
      joinedClubs.push({ clubId: req.params.id, joinedAt: new Date().toISOString() });
      t.set(userRef, { ...udata, joinedClubs }, { merge: true });
    });

    res.json({ message: "Joined club" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Get club members list (admin)
router.get("/:id/members", verifyToken, requireAdmin, async (req, res) => {
  try {
    const clubDoc = await db.collection("clubs").doc(req.params.id).get();
    if (!clubDoc.exists) return res.status(404).json({ message: "Club not found" });
    const members = clubDoc.data().members || [];
    // Fetch member user profiles
    const users = [];
    for (const uid of members) {
      const uDoc = await db.collection("users").doc(uid).get();
      if (uDoc.exists) users.push({ uid, ...(uDoc.data() || {}) });
      else users.push({ uid }); // fallback
    }
    res.json({ members: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
