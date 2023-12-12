import type { PageServerLoad, Actions } from "./$types";
import { adminDB, adminAuth } from "$lib/server/admin";
import { error, fail, redirect } from "@sveltejs/kit";

export const load = (async ({ params, locals }) => {
    const uid = locals.userID;
    console.log({ uid }, ",====")

    if (!uid) {
        throw redirect(301, '/login');
    }

    const userDoc = await adminDB.collection('users').doc(uid).get();
    const { bio, username } = userDoc.data()!;

    if (params.username !== username) {
        throw error(403, 'The username doesn\'t belong to you')
    }

    return { bio }
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ locals, request, params }) => {

      const uid = locals.userID;

      const data = await request.formData();
      const bio = data.get('bio');
  
      const userRef = adminDB.collection("users").doc(uid!);
      const { username } = (await userRef.get()).data()!;
  
      if (params.username !== username) {
        throw error(401, "That username does not belong to you");
      }
  
      if (bio!.toString().length > 260) {
        return fail(400, { problem: "Bio must be less than 260 characters" });
      }
  
      await userRef.update({
        bio,
      });
    },
  } satisfies Actions;