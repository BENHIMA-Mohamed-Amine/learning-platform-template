const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

const CACHE_PREFIX = "student:";
const CACHE_TTL = 3600;

async function createStudent(req, res) {
  const student = await mongoService.insertOne("students", req.body);
  res.status(201).json(student);
}

async function createStudents(req, res) {
  const student = await mongoService.insertMany("students", req.body);
  res.status(201).json(student);
}

async function updateStudent(req, res) {
  const student = await mongoService.updateOne("students", req.body);
  res.status(200).json(student);
}

async function updateStudents(req, res) {
  const student = await mongoService.updateMany("students", req.body);
  res.status(200).json(student);
}

async function deleteStudent(req, res) {
  const student = await mongoService.deleteOneById("students", req.params.id);
  res.status(200).json(student);
}

async function deleteStudents(req, res) {
  const student = await mongoService.deleteMany("students", req.body);
  res.status(200).json(student);
}

async function getStudent(req, res) {
  const cacheKey = `${CACHE_PREFIX}:${req.params.id}`;
  const cache = await redisService.getData(cacheKey);
  if (cache) {
    res.status(200).json(cache);
    return;
  }
  const student = await mongoService.findOneById("students", req.params.id);
  await redisService.cacheData(cacheKey, student, CACHE_TTL);
  res.status(200).json(student);
}

async function getStudents(req, res) {
  const cache = await redisService.getData(`${CACHE_PREFIX}:all`);
  if (cache) {
    res.status(200).json(cache);
    return;
  }
  const students = await mongoService.find("students", {});
  await redisService.cacheData(`${CACHE_PREFIX}:all`, students, CACHE_TTL);
  res.status(200).json(students);
}

module.exports = {
  createStudent,
  createStudents,
  updateStudent,
  updateStudents,
  deleteStudent,
  deleteStudents,
  getStudent,
  getStudents,
};
