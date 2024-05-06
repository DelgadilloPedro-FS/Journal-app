import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";



// get journals
export async function getJournals(query) {
  let journals = await localforage.getItem("journals");
  if (!journals) journals = [];
  if (query) {
    journals = matchSorter(journals, query, {
      keys: ["name", "author_First_Name", "author_Last_Name"],
    });
  }
  return journals.sort(sortBy("createdAt"));
}

// create journals
export async function createJournal() {
  // TODO: routing issue with ID is require for 
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