import { Db, ObjectId } from "mongodb";
import { COL } from "../../constants";

const getUser = async (db: Db, id: string) => {
  try {
    if (!ObjectId.isValid(id)) return null;
    const user: any = await db
      .collection(COL.USERS)
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $lookup: {
            from: COL.USERS,
            localField: "friends",
            foreignField: "_id",
            as: "friends",
          },
        },
        {
          $project: {
            _id: 1,
            friends: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              email: 1,
              location: 1,
              occupation: 1,
              picturePath: 1,
            },
          },
        },
      ])
      .toArray();
    return user[0];
  } catch (error: any) {
    console.log(error?.message);
  }
};

const getUserFriends = async (db: Db, id: string) => {
  try {
    if (!ObjectId.isValid(id)) return null;
    const user = await db
      .collection(COL.USERS)
      .aggregate([
        {
            $match: { _id: new ObjectId(id) },
        },
        {
            $lookup: {
                from: COL.USERS,
                localField: "friends",
                foreignField: "_id",
                as: "friends",
            },
        },
        {
            $project: {
                _id: 1,
                friends: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    location: 1,
                    occupation: 1,
                    picturePath: 1,
                },
            },
        }
      ])
      .toArray();

      const count = await user[0].friends.length;

    return {
        count,
        friends: user[0].friends
    };

  } catch (error: any) {
    console.log(error?.message);
  }
};

const addRemoveFriend = async (db: Db, id: string, friendId: string) => {
  try {
    if (!ObjectId.isValid(id) || !ObjectId.isValid(friendId)) return null;
    const user = await db
      .collection(COL.USERS)
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
      ])
      .toArray();

    // const friend = await db.collection(COL.USERS).aggregate([
    //     {
    //         $match: { _id: new ObjectId(friendId) },
    //     }
    // ]).toArray();

    const isFriend = await user[0].friends
      .map((friend: any) => (friend._id === friendId ? true : false))
      .includes(true);

    if (isFriend) {
      await db
        .collection(COL.USERS)
        .updateOne(
          { _id: new ObjectId(id) },
          { $pull: { friends: new ObjectId(friendId) } }
        );
      await db
        .collection(COL.USERS)
        .updateOne(
          { _id: new ObjectId(friendId) },
          { $pull: { friends: new ObjectId(id) } }
        );
      return { message: "Friend removed" };
    } else {
      await db
        .collection(COL.USERS)
        .updateOne(
          { _id: new ObjectId(id) },
          { $push: { friends: new ObjectId(friendId) } }
        );
      await db
        .collection(COL.USERS)
        .updateOne(
          { _id: new ObjectId(friendId) },
          { $push: { friends: new ObjectId(id) } }
        );
      return { message: "Friend added" };
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};

export { getUser, getUserFriends, addRemoveFriend };
