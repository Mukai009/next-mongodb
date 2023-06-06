import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("posts");
    const { id } = req.query;
    const { title, content } = req.body;
    console.log("edit post, ", id, title, content);

    const post = await db.collection("posts").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );

    console.log(post);

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
