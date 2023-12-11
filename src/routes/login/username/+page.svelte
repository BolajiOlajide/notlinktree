<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db } from "$lib/firebase";
    import { user, userData } from "$lib/stores/user.store"
    import { doc, getDoc, writeBatch } from "firebase/firestore";

    let username: string = "";
    let loading: boolean = false;
    let isAvailable: boolean = false;
    let debounceTimer: NodeJS.Timeout;

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    $: isValid = username.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading

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

    async function confirmUsername() {
        console.log(`confirming username ${username}`);
        const batch = writeBatch(db);

        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), { 
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: 'I am the Walrus',
            links: [
                {
                    title: 'Test Link',
                    url: 'https://kung.foo',
                    icon: 'custom'
                }
            ]
        });

        await batch.commit();

        username = '';
        isAvailable = false;
    }
</script>

<AuthCheck>
    {#if $userData?.username}
        <p>Your username is <span>@{$userData.username}</span></p>
        <p>(Usernames cannot be changed)</p>
        <a href="/login/photo">Upload Profile Image</a>
    {:else}
    <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
        <input 
            on:input={checkAvailability} 
            type="text" 
            bind:value={username} 
            placeholder="Username" 
            class="input w-full" 
            class:input-error={(!isValid && isTouched && !loading)}
            class:input-warning={isTaken}
            class:input-success={isAvailable && isValid && !loading}
        />

        <div class="my-4 min-h-16 px-8 w-full">
            {#if !isValid && isTouched}
                <p class="text-error text-sm">must be 3-16 characters long, alphanumeric only</p>
            {/if}

            {#if loading}
                <span class="loading loading-spinner loading-lg"></span>
                <p class="text-secondary">Checking availability of @{username}</p>
            {/if}

            {#if isValid && !isAvailable && !loading}
                <p class="text-warning text-sm">@{username} is not available</p>
            {/if}
        </div>

        {#if isAvailable}
            <button class="btn btn-success my-2">Confirm username @{username} </button>
        {/if}
    </form>
    {/if}    
</AuthCheck>