# How to Deploy Supabase Edge Functions

This is a one-time setup to get your local Edge Functions live on your Supabase project.

You MUST run these commands from your project's terminal on your computer.

---

### Step 1: Log in to Supabase

This command connects your computer to your Supabase account. It will open a browser window for you to log in securely.

```bash
npx supabase login
```

---

### Step 2: Link Your Project

This command links your local project code to the correct project in your Supabase account. You'll be asked to choose which project you want to connect to.

```bash
npx supabase link
```
If you get an error that the project is already linked, you can skip this step.

---

### Step 3: Deploy the Function

This command takes the function from your local folder and sends it to your live Supabase project. Run this for each function you want to deploy.

**To deploy the Realtor Invite function:**
```bash
npx supabase functions deploy send-realtor-invite --no-verify-jwt
```

---

After running these commands, you can go to your Supabase dashboard, click on **Edge Functions** in the sidebar, and you will see the function listed there. Once you see it, the feature in your app will work.