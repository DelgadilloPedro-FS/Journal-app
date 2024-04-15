import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
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
    <Form
      method="post"
      id="journal-form"
      className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-4">New Journal Entry</h2>

      <div className="mb-6">
        <label
          htmlFor="journal-name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Journal Name
        </label>
        <input
          type="text"
          id="journal-name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Journal Name"
          name="name"
          defaultValue={journal.name}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-6">
          <label
            htmlFor="author-first-name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Author First Name
          </label>
          <input
            type="text"
            id="author-first-name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter First Name"
            name="author_First_Name"
            defaultValue={journal.author_First_Name}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="author-last-name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Author Last Name
          </label>
          <input
            type="text"
            id="author-last-name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Last Name"
            name="author_Last_Name"
            defaultValue={journal.author_Last_Name}
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="journal-entry"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Journal Entry
        </label>
        <textarea
          id="journal-entry"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Write your journal entry here..."
          name="entry"
          defaultValue={journal.entry}
          rows={6}
        />
      </div>

      <p className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Entry
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
