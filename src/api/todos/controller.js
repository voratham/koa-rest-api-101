const Todo = require("./model");

exports.create = async data => {
  try {
    const todo = new Todo(data);
    const response = await todo.save();
    return response;
  } catch (error) {
    return error;
  }
};

exports.get = async id => {
  try {
    return await Todo.findById(id);
  } catch (error) {
    return error;
  }
};

exports.getAll = async () => {
  return await Todo.find();
};

exports.update = async ({ id, ...body }) => {
  try {
    if (!Object.keys(body).length) throw { error: "Invalid body" };
    const data = await Todo.findByIdAndUpdate(
      id,
      { $set: { ...body, updatedAt: new Date() } },
      { new: true, runValidators: true }
    );
    if (!data) throw { error: "Fail to updated your todo list." };
    return data;
  } catch (error) {
    return { error: error.message || error };
  }
};

exports.delete = async id => {
  await Todo.deleteOne({ _id: id });
  return { message: "Deleted  to successfully." };
};
