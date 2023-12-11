<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db } from "$lib/firebase";
    import { user } from "$lib/stores/user.store"
    import { doc, getDoc, writeBatch } from "firebase/firestore";

    let username = "";
    let loading = false;
    let isAvailable = false;
    let debounceTimer: NodeJS.Timeout;

    async function checkAvailability() {
        isAvailable = false;
        loading = true;
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(async () => {
            console.log(`checking availability of ${username}`);
            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then(doc => doc.exists());

            isAvailable = !exists;
            loading = false;
        }, 500);
    }

    async function confirmUsername() {}
</script>

<AuthCheck>
    <h2>Username</h2>

    <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
        <input on:input={checkAvailability} type="text" bind:value={username} placeholder="Username" class="input w-full" />

        <p class="my-4">Is available? {isAvailable}</p>

        <button class="btn btn-success">Confirm username @{username} </button>
    </form>
</AuthCheck>