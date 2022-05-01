import { firestore } from "../../../firebase/admin";

export default async function (req, res) {
  const { query } = req;
  const { id } = query;

  const document = await firestore.collection("devits").doc(id).get();
  const data = document.data();

  return res.json({
    ...data,
    id: data.id,
    normalizedDate: +data.createdAt.toDate(),
    createdAt: +data.createdAt.toDate(),
  });
}
