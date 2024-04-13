import { Form, useLoaderData, redirect,useNavigate, } from "react-router-dom";
import { updateJournal } from "../journals";




export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateJournal(params.journalId, updates);
  return redirect(`/journals/${params.journalId}`);
}
export default function EditJournal() {
  const { journal } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="journal-form">
      <p>
        <span>Journal Name</span>
        <input
        placeholder="Journal"
        aria-label="Journal name"
        type="text"
        name="name"
        defaultValue={journal.name}
        />
      </p>
      <p>
        <span>Author Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="author_First_Name"
          defaultValue={journal.author_First_Name}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="author_Last_Name"
          defaultValue={journal.author_Last_Name}
        />
      </p>
      <label>
        <span>Entry</span>
        <textarea name="entry" defaultValue={journal.entry} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >Cancel</button>
      </p>
    </Form>
  );
}
