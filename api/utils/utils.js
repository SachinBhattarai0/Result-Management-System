const paginate = require("jw-paginate");
const { isValidObjectId } = require("mongoose");

const TEACHER = "teacher";
const ADMIN = "admin";

exports.TEACHER = TEACHER;
exports.ADMIN = ADMIN;

exports.userRoles = [TEACHER, ADMIN];

exports.emailValidatorRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.sendError = (res, msg, code = 400) => {
  res.status(code).json({ error: true, message: msg });
};

exports.paginator = (listOfItems, pageSize, page) => {
  // get pager object for specified page
  const pager = paginate(listOfItems.length, page, pageSize);
  // get page of items from items array
  const paginatedListOfItems = listOfItems.slice(
    pager.startIndex,
    pager.endIndex + 1
  );

  return { paginatedList: paginatedListOfItems, pager };
};

exports.validateObjectId = (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("invalid id");
  }
};
