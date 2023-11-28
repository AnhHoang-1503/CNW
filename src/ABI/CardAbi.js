import { contract, execute } from './AbiConfig'

class Card {
  constructor(data) {
    this.id = data.id
    this.word = data.word
    this.meaning = data.meaning
    this.example = data.example
    this.courseId = data.courseId
  }
}

/**
 * Lấy danh sách thẻ theo mã khóa học
 * @param {string} courseId
 * @returns {Card[]} Danh sách thẻ học
 */
async function getCardsByCourse(courseId) {
  var cards = await contract.getCardsByCourse(courseId)

  cards = cards.map((card) => {
    return new Card(card)
  })

  return cards
}

/**
 * Tạo thẻ học mới
 * @param {string} word Từ vựng
 * @param {string} meaning Nghĩa
 * @param {string} example Ví dụ
 * @param {string} courseId Mã khóa học
 */
async function createCard(word, meaning, example, courseId) {
  var tx = await contract.createCard(word, meaning, example, courseId)

  // Đợi giao dịch được xác nhận
  await tx.wait()
}

/**
 * Chỉnh sửa thẻ học
 * @param {string} id Id card
 * @param {string} word Từ vựng
 * @param {string} meaning Nghĩa
 * @param {string} example Ví dụ
 */
async function updateCard(id, word, meaning, example) {
  var tx = await contract.updateCard(id, word, meaning, example)

  // Đợi giao dịch được xác nhận
  await tx.wait()
}

/**
 * Xóa thẻ học
 * @param {string} id Id card
 */
async function deleteCard(id) {
  var tx = await contract.deleteCard(id)

  // Đợi giao dịch được xác nhận
  await tx.wait()
}

export default {
  /**
   * Lấy danh sách thẻ theo mã khóa học
   * @param {string} courseId
   * @returns {Card[]} Danh sách thẻ học
   */
  getCardsByCourse: async (courseId) => await execute(getCardsByCourse, [courseId]),
  /**
   * Tạo thẻ học mới
   * @param {string} word Từ vựng
   * @param {string} meaning Nghĩa
   * @param {string} example Ví dụ
   * @param {string} courseId Mã khóa học
   */
  createCard: async (word, meaning, example, courseId) =>
    await execute(createCard, [word, meaning, example, courseId]),
  /**
   * Chỉnh sửa thẻ học
   * @param {string} id Id card
   * @param {string} word Từ vựng
   * @param {string} meaning Nghĩa
   * @param {string} example Ví dụ
   */
  updateCard: async (id, word, meaning, example) =>
    await execute(updateCard, [id, word, meaning, example]),
  /**
   * Xóa thẻ học
   * @param {string} id Id card
   */
  deleteCard: async (id) => await execute(deleteCard, [id])
}