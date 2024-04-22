import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

const API_BASE =
  process.env.NODE_ENV === "development"
    ? `http://localhost:8000`
    : process.env.REACT_APP_BASE_URL;

// get journals
export async function getJournals(query) {
  try {
    // Fetch data from database API
    const response = await fetch(`${API_BASE}/journals`);

    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Store data locally (optional, for offline usage)
    await localforage.setItem("journals", data);

    return processJournals(data, query); // Process and return fetched data
  } catch (error) {
    console.error("Error fetching journals:", error);
    return []; // Or return an empty array or default value if fetching fails
  }
}

// Helper function to process fetched data (optional)
function processJournals(data, query) {
  let journals = data;
  if (query) {
    journals = matchSorter(journals, query, {
      keys: ["name", "author_First_Name", "author_Last_Name"],
    });
  }
  return journals.sort(sortBy("createdAt"));
}
// create journals
export async function createJournal() {
  let _id = Math.random().toString(36).substring(2, 9);
  let journal = { _id, createdAt: Date.now() };
  let journals = await getJournals();
  journals.unshift(journal);
  await set(journals);
  return journal;
}

export async function getJournal(_id) {
  let journals = await localforage.getItem("journals");
  let journal = journals.find((journal) => journal._id === _id);
  return journal ?? null;
}

export async function updateJournal(_id, updates) {
  let journals = await localforage.getItem("journals");
  let journal = journals.find((journal) => journal._id === _id);
  if (!journal) throw new Error("No journal found for", _id);
  Object.assign(journal, updates);
  await set(journals);
  return journal;
}

export async function deleteJournal(_id) {
  let journals = await localforage.getItem("journals");
  let index = journals.findIndex((journal) => journal._id === _id);
  if (index > -1) {
    journals.splice(index, 1);
    await set(journals);
    return true;
  }
  return false;
}

export async function set(journals) {
  return localforage.setItem("journals", journals);
}
