import { MetaData, VideoDB } from "@/types";
import { fetchGraphQL } from "./hasura";

// --------------------------- Video ---------------------------
export async function addNewVideo(videoData: VideoDB, token: string) {
  const operationsDoc = `
    mutation AddNewVideo($userId:String!, $videoId:String!, $watched:Boolean!, $favorited:Int!) {
      insert_stats_one(
        object: {
          user_id: $userId,
          video_id: $videoId,
          watched: $watched, 
          favorited: $favorited
        }) {
        id
        video_id
        watched
        favorited
      }
    }
  `;

  const { userId, videoId, watched, favorited } = videoData;

  const { data } = await fetchGraphQL(
    operationsDoc,
    "AddNewVideo",
    { userId, videoId, watched, favorited },
    token
  );

  return data?.["insert_stats_one"];
}

export async function updateVideo(videoData: VideoDB, token: string) {
  const operationsDoc = `
    mutation UpdateVideo($userId:String!, $videoId:String!, $watched:Boolean!, $favorited: Int!) {
      update_stats(
        _set: {
          watched: $watched,
          favorited: $favorited
        }, 
        where: {
          user_id: {_eq: $userId},
          video_id: {_eq: $videoId}
        }) {
        returning {
          id
          video_id
          watched
          favorited
        }
      }
    }
  `;

  const { userId, videoId, watched, favorited } = videoData;

  const { data } = await fetchGraphQL(
    operationsDoc,
    "UpdateVideo",
    {
      userId,
      videoId,
      watched,
      favorited,
    },
    token
  );

  return data?.["update_stats"]?.returning[0];
}

export async function findVideoIdByUserId(userId: string, videoId: string, token: string) {
  const operationsDoc = `
    query FindVideoIdByUserId($userId:String!, $videoId:String!) {
      stats(
        where: {
          user_id: {_eq: $userId },
          video_id: {_eq: $videoId }}
        ) {
        id
        video_id
        watched
        favorited
      }
    }
  `;

  const { data } = await fetchGraphQL(
    operationsDoc,
    "FindVideoIdByUserId",
    {
      userId,
      videoId,
    },
    token
  );

  return data?.stats;
}

// --------------------------- User ---------------------------
export async function createNewUser(metaData: MetaData, token: string) {
  const operationsDoc = `
    mutation CreateNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
      insert_users(
        objects: {
          email: $email,
          issuer: $issuer,
          publicAddress: $publicAddress
        }) {
        affected_rows
      }
    }
  `;

  const { email, issuer, publicAddress } = metaData;

  const { data } = await fetchGraphQL(
    operationsDoc,
    "CreateNewUser",
    {
      email,
      issuer,
      publicAddress,
    },
    token
  );

  return data;
}

export async function isNewUser(issuer: string, token: string) {
  const operationsDoc = `
      query IsNewUserQuery($issuer: String!) {
        users(
          where: {
            issuer: {_eq: $issuer }
          }) {
          id
          email
          issuer
          publicAddress
        }
      }
  `;

  const { data } = await fetchGraphQL(
    operationsDoc,
    "IsNewUserQuery",
    {
      issuer,
    },
    token
  );

  return data?.users?.length === 0;
}
