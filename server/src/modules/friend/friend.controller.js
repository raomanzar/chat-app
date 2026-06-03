import {
  sendFriendRequestService,
  getFriendsService,
  discoverUsersService,
  acceptFriendRequestService,
  rejectFriendRequestService,
  cancelFriendRequestService,
} from "./friend.service.js";

export const discover = async (req, res) => {
  const userId = req.user.id;
  const search = req.query.search;
  try {
    const data = await discoverUsersService(userId, search);
    return res.json(data);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to discover users" });
  }
};

export const listFriends = async (req, res) => {
  const userId = req.user.id;
  try {
    const data = await getFriendsService(userId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get friend list" });
  }
};

export const sendRequest = async (req, res) => {
  const senderId = req.user.id;
  const { receiverId } = req.body;
  try {
    const data = await sendFriendRequestService(senderId, receiverId);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Failed to send friend request" });
  }
};

export async function acceptRequest(req, res) {
  try {
    const userId = req.user.id;
    const { requestId } = req.params;

    const result = await acceptFriendRequestService(requestId, userId);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to accept request" });
  }
}

export async function rejectRequest(req, res) {
  try {
    const userId = req.user.id;
    const { requestId } = req.params;

    const result = await rejectFriendRequestService(requestId, userId);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to reject request" });
  }
}

export async function cancelRequest(req, res) {
  try {
    const userId = req.user.id;
    const { requestId } = req.params;

    const result = await cancelFriendRequestService(requestId, userId);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to cancel request" });
  }
}
