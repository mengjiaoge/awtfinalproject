import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {QuestionService} from '../../services/question.service';


@Component({
    selector: 'app-blog',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
    form;
    newAnswerForm;
    isOn=false;
    messageClass;
    message;
    newPost = false;
    processing = false;
    questions;
    currentCourse = JSON.parse(localStorage.getItem('course'));
    currentUser = JSON.parse(localStorage.getItem('user'));
    courseAndSession = {
        course: this.currentCourse,
        session: this.currentCourse[0].sessions
    };

    // name;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private questionService: QuestionService) {
        this.createNewBlogForm(); // Create new blog form on start up
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(),
            body: new FormControl(),
        });
        this.newAnswerForm = new FormGroup({
            answer: new FormControl(),
        });

        this.showQuestions();
    }

    // Function to create new blog form
    createNewBlogForm() {

        this.form = this.formBuilder.group({
            // Title field
            title: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(5),
            ])],
            // Body field
            body: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(500),
                Validators.minLength(5)
            ])]
        })
    }


    // Enable new blog form
    enableFormNewBlogForm() {
        this.form.get('title').enable(); // Enable title field
        this.form.get('body').enable(); // Enable body field
    }

    // Disable new blog form
    disableFormNewBlogForm() {
        this.form.get('title').disable(); // Disable title field
        this.form.get('body').disable(); // Disable body field
    }

    //post Likes
    postLike(questionId){

        var data={questionId:questionId,userId:this.currentUser.id };
        this.questionService.newLike(data).subscribe(data => {
            // Check if blog was saved to database or not
            if (!data.success) {
                this.messageClass = 'alert alert-danger'; // Return error class
                this.message = data.message; // Return error message
                this.processing = false; // Enable submit button
                this.enableFormNewBlogForm(); // Enable form
            } else {
                this.isOn=true;
                this.showQuestions();
            }
        });
    }

    // Function to submit a new blog post
    onBlogSubmit() {
        this.processing = true; // Disable submit button
        this.disableFormNewBlogForm(); // Lock form

        // Create blog object from form fields
        const blog = {
            title: this.form.get('title').value, // Title field
            body: this.form.get('body').value, // Body field
        };

        // Function to save blog into database
        this.questionService.newQuestion(blog).subscribe(data => {
            // Check if blog was saved to database or not
            if (!data.success) {
                this.messageClass = 'alert alert-danger'; // Return error class
                this.message = data.message; // Return error message
                this.processing = false; // Enable submit button
                this.enableFormNewBlogForm(); // Enable form
            } else {
                this.messageClass = 'alert alert-success'; // Return success class
                this.message = data.message; // Return success message
                //this.getAllBlogs();
                // Clear form data after two seconds
                setTimeout(() => {
                    this.newPost = false; // Hide form
                    this.processing = false; // Enable submit button
                    this.message = false; // Erase error/success message
                    this.form.reset(); // Reset all form fields
                    this.enableFormNewBlogForm(); // Enable the form fields
                }, 2000);
                this.showQuestions();
            }
        });
    }

    // Validation for title
    alphaNumericValidation(controls) {
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
        // Check if test returns false or true
        if (regExp.test(controls.value)) {
            return null; // Return valid
        } else {
            return {'alphaNumericValidation': true} // Return error in validation
        }
    }

    // Function to display new blog form
    newBlogForm() {
        this.newPost = true; // Show new blog form
    }
    draftComment(id) {
        this.newAnswerForm.reset(); // Reset the comment form each time users starts a new comment
        this.newAnswerForm = []; // Clear array so only one post can be commented on at a time
        this.newAnswerForm.push(id); // Add the post that is being commented on to the array
    }

    showQuestions() {
        console.log(this.courseAndSession);
        var courseAndSession = this.courseAndSession;
        console.log(courseAndSession);
        this.questionService.getQuestions(courseAndSession).subscribe(data => {
            console.log(data);
            this.questions = data;
        });
    }

    postAnswer(formData,questionId) {
        var data={answer: formData,questionId:questionId,user:this.currentUser};

        // Function to save blog into database
        this.questionService.newAnswer(data).subscribe(data => {
            // Check if blog was saved to database or not
            if (!data.success) {
                this.messageClass = 'alert alert-danger'; // Return error class
                this.message = data.message; // Return error message
                this.processing = false; // Enable submit button
                this.enableFormNewBlogForm(); // Enable form
            } else {
                this.isOn=true;
                this.showQuestions();
            }
        });
    }


    toggle(){
      return  this.isOn=!this.isOn;
    }
}
