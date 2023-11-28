// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.20;

contract CoursesStorage {
    constructor() payable {
    }
    
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
        uint[] cardIds;
        address author;
    }

    // Danh sách các khóa học
    uint public courseCount = 0;
    mapping(uint => Course) public courses;
    uint public cardCount = 0;
    mapping (uint => Card) public cards;
    mapping (address => uint[]) coursesByAuthor;
    mapping (uint => uint[]) cardsInCourse;

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
        Course[] memory _courses = new Course[](courseCount);
        for (uint i = 0; i < courseCount; i++) {
            _courses[i] = courses[i + 1];
        }
        return _courses;
    }
    // Xem danh sách khóa học của một tác giả
    function getCoursesByAuthor(address author) public view returns (Course[] memory) {
        uint[] memory _courseIds = coursesByAuthor[author];
        Course[] memory _courses = new Course[](_courseIds.length);
        for (uint i = 0; i < _courseIds.length; i++) {
            _courses[i] = courses[_courseIds[i]];
        }
        return _courses;
    }
    // Tạo một khóa học mới
    function createCourse(string memory name, string memory description) public {
        courseCount++;
        courses[courseCount] = Course(courseCount, name, description, new uint[](0), msg.sender);
        coursesByAuthor[msg.sender].push(courseCount);
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
        delete courses[courseId];
    }

    // Xem danh sách thẻ từ của một khóa học
    function getCardsByCourse(uint courseId) public view returns (Card[] memory) {
        Card[] memory _cards = new Card[](courses[courseId].cardIds.length);
        for (uint i = 0; i < courses[courseId].cardIds.length; i++) {
            _cards[i] = cards[courses[courseId].cardIds[i]];
        }
        return _cards;
    }
    // Tạo một thẻ từ mới
    function createCard(string memory word, string memory meaning, string memory example, uint courseId) public requireCourseAuthor(courseId) {
        cardCount++;
        cards[cardCount] = Card(cardCount, word, meaning, example, courseId);
        courses[courseId].cardIds.push(cardCount);
        cardsInCourse[courseId].push(cardCount);
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
        delete cards[cardId];
    }
}