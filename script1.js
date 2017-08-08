$(".landing").on("click", ".landingbutton", function () {

    $landing = $(this).parent();
    $landing.hide();
    $("#mainPage").show();

});

function Book(title, description, cover, linkWikipedia, linkComprar) {
    
    this.title = title;
    this.description = description;
    this.cover = cover;
    this.linkWikipedia = linkWikipedia;
    this.linkComprar = linkComprar;
    this.like = 0;
    this.dislike = 0; 

    this.render = function () {

        $("#title").html(this.title);
        $("#description").html(this.description);
        $("#cover").attr("src", this.cover);
        $("a.linkWikipedia").attr("href", this.linkWikipedia);
        $("a.linkComprar").attr("href", this.linkComprar);
    }
}

function Queue () {

    this.data = [];

    this.enqueue = function(element) {
        this.data.push(element);
    }
    this.dequeue = function() {
        var result = this.data[0];
        this.data.shift();
        return result;
    }
}

function Library() {

    this.books = new Queue();
    this.booksViewed = new Queue();
    this.actualBook = null;
    this.addBook = function (book) {
        this.books.enqueue(book);
    }
    this.nextbook = function () {
        this.actualBook = this.books.dequeue();
        this.actualBook.render();
        this.booksViewed.enqueue(this.actualBook);
    }
    
    this.contadorLikes = function() {
        var b = this.books.dequeue();
        var likes = 0;
        var dislikes = 0;
        while ( b!= null) {
            likes = likes + b.likes;
            dislikes = dislikes + this.books.dislikes;
            b=this.books.dequeue();
        }
        $("#mainPage").hide();
        $("#endPage").show();

    }
    
    this.like = function () {
        this.actualBook.like++;
        this.nextbook();
    }
    this.dislike = function () {
        this.actualBook.dislike++;
        this.nextbook();
    }
}

var book1 = new Book("Harry Potter e a Pedra Filosofal", "A boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.", "http://ecx.images-amazon.com/images/I/51eqYMqRNpL._SX332_BO1,204,203,200_.jpg", "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher's_Stone", "https://www.wook.pt/livro/harry-potter-e-a-pedra-filosofal-j-k-rowling/46725")
var book2 = new Book("Harry Potter e a Camara dos Segredos", "Harry Potter and his friends, Ron and Hermione, facing new challenges during their second year at Hogwarts School of Witchcraft and Wizardry as they try to discover a dark force that is terrorizing the school.", "https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL.jpg", "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Chamber_of_Secrets", "https://www.wook.pt/livro/harry-potter-e-a-camara-dos-segredos-j-k-rowling/46758")
var book3 = new Book("Harry Potter e o Prisioneiro de Azkaban", "Harry Potter and his friends, Ron and Hermione, facing new challenges during their second year at Hogwarts School of Witchcraft and Wizardry as they try to discover a dark force that is terrorizing the school.", "http://harrypotteraudiobooks.org/wp-content/uploads/2015/10/harry-potter-and-the-prisoner-of-azkaban-free-audiobook-download.jpg", "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Prisoner_of_Azkaban", "https://www.wook.pt/livro/harry-potter-e-o-prisioneiro-de-azkaban-j-k-rowling/46787")

var library = new Library();

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

library.nextbook();

$("#buttonDislike").click(function () {
    library.dislike();
});
$("#buttonLike").click(function () {
    library.like();
});

