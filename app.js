import fileDB from "./fileDB.js";

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

fileDB.registerSchema("newspost", newspostSchema);

const newspostTable = fileDB.getTable("newspost");

const data = {
  title: "У зоопарку Чернігова лисичка народила лисеня",
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
};
const createdNewspost = newspostTable.create(data);

const newsposts = newspostTable.getAll();

console.log("All posts", newsposts);
console.log("Created post", createdNewspost);

const updatedNewsposts = newspostTable.update(createdNewspost.id, {
  title: "Маленька лисичка",
});

console.log("Updated post", updatedNewsposts);

const deletedId = newspostTable.delete(createdNewspost.id);

console.log("Deleted postId", deletedId);
