// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract CoursesStorage {
    constructor() payable {
    }

    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;

    // receiver function 
    uint public receivedEther;
    receive() external payable {
        receivedEther += msg.value;
    }

    // Thẻ từ
    struct Card {
        uint id;
        string word;
        string meaning;
        string example;
        uint courseId;
    }

    // Khóa học
    struct Course {
        uint id;
        string name;
        string description;
        address author;
    }

    // Danh sách các khóa học
    uint public courseCount = 0;
    mapping(uint => Course) private courses;
    EnumerableSet.UintSet private listCourseIds;
    // Danh sách card
    uint public cardCount = 0;
    mapping (uint => Card) private cards;
    EnumerableSet.UintSet private listCardIds;
    
    // author to courses
    mapping (address => EnumerableSet.UintSet) coursesByAuthor;

    // course to cards
    mapping (uint => EnumerableSet.UintSet) cardsInCourse;

    // Yêu cầu người dùng phải là tác giá của khóa học
    error NotCourseAuthor(uint courseId);
    modifier requireCourseAuthor(uint courseId) {
        if (courses[courseId].author != msg.sender) {
            revert NotCourseAuthor(courseId);
        }
        _;
    }

    event CourseChange(uint indexed courseId, string name, string description, address author);
    event CardChange(uint indexed cardId, string word, string meaning, string example, uint courseId);

    // Xem danh sách toàn bộ khóa học
    function getCourses() public view returns (Course[] memory) {
        Course[] memory _courses = new Course[](EnumerableSet.length(listCourseIds));
        for (uint i = 0; i < EnumerableSet.length(listCourseIds); i++) {
            _courses[i] = courses[EnumerableSet.at(listCourseIds, i)];
        }
        return _courses;
    }
    // Xem danh sách khóa học của một tác giả
    function getCoursesByAuthor(address author) public view returns (Course[] memory) {
        Course[] memory _courses = new Course[](EnumerableSet.length(coursesByAuthor[author]));
        for (uint i = 0; i < EnumerableSet.length(coursesByAuthor[author]); i++) {
            _courses[i] = courses[EnumerableSet.at(coursesByAuthor[author], i)];
        }
        return _courses;
    }
    // Tạo một khóa học mới
    function createCourse(string memory name, string memory description) public {
        courseCount++;
        courses[courseCount] = Course(courseCount, name, description, msg.sender);
        EnumerableSet.add(coursesByAuthor[msg.sender], courseCount);
        EnumerableSet.add(listCourseIds, courseCount);
        emit CourseChange(courseCount, name, description, msg.sender);
    }
    // Chỉnh sửa thông tin khóa học
    function updateCourse(uint courseId, string memory name, string memory description ) public requireCourseAuthor(courseId) {
        courses[courseId].name = name;
        courses[courseId].description = description;
        emit CourseChange(courseId, name, description, msg.sender);
    }
    // Xóa khóa học
    function deleteCourse(uint courseId) public requireCourseAuthor(courseId) {
        EnumerableSet.remove(coursesByAuthor[msg.sender], courseId);
        EnumerableSet.remove(listCourseIds, courseId);
        delete courses[courseId];
    }

    // Xem danh sách thẻ từ của một khóa học
    function getCardsByCourse(uint courseId) public view returns (Card[] memory) {
        Card[] memory _cards = new Card[](EnumerableSet.length(cardsInCourse[courseId]));
        for (uint i = 0; i < EnumerableSet.length(cardsInCourse[courseId]); i++) {
            _cards[i] = cards[EnumerableSet.at(cardsInCourse[courseId], i)];
        }
        return _cards;
    }
    // Tạo một thẻ từ mới
    function createCard(string memory word, string memory meaning, string memory example, uint courseId) public requireCourseAuthor(courseId) {
        cardCount++;
        cards[cardCount] = Card(cardCount, word, meaning, example, courseId);
        EnumerableSet.add(cardsInCourse[courseId], cardCount);
        EnumerableSet.add(listCardIds, cardCount);
        emit CardChange(cardCount, word, meaning, example, courseId);
    }
    // Sửa thông tin thẻ từ
    function updateCard(uint cardId, string memory word, string memory meaning, string memory example) public requireCourseAuthor(cards[cardId].courseId){
        cards[cardId].word = word;
        cards[cardId].meaning = meaning;
        cards[cardId].example = example;
        emit CardChange(cardId, word, meaning, example, cards[cardId].courseId);
    }
    // Xóa thẻ từ
    function deleteCard(uint cardId) public requireCourseAuthor(cards[cardId].courseId) {
        EnumerableSet.remove(cardsInCourse[cards[cardId].courseId], cardId);
        EnumerableSet.remove(listCardIds, cardId);
        delete cards[cardId];
    }
}