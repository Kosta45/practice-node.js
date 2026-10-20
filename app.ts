import fileDB from "./fileDB.js";

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

fileDB.registerSchema("newspost", newspostSchema);

const newspostTable = fileDB.getTable("newspost");

console.log("All posts:", newspostTable.getAll());

console.log("Post by ID:", newspostTable.getById(1));

const createdPost = newspostTable.create({
  title: "У зоопарку Чернігова лисичка народила лисеня",
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
});
console.log("Created post:", createdPost);

const updatedPost = newspostTable.update(createdPost.id, {
  title: "Маленька лисичка",
});
console.log("Updated post:", updatedPost);

const deletedId = newspostTable.delete(createdPost.id);
console.log("Deleted post ID:", deletedId);

console.log("All posts after deletion:", newspostTable.getAll());
