$(document).ready(function(){
	var myBookData ;
	
	$.ajax({
		
		url : "Xml/books.xml",
		success:function(data){
		
			myBookData = data ;
			
			
			
			 Books = $(myBookData).children("bookstore").children("book");
			
			fillCat()
			fillPro(1)
		},
		error:function(){
			
			alert("Err")
		}
		
	});
	
	function fillCat(){
		
		Books = $(myBookData).children("bookstore").children("book");
		$(".Left_panel").append("<ul></ul>")
		/*for(i=0;i<Books.length;i++){
			
			$(".Left_panel ul").append("<li>"+$(Books).eq(i).attr("category")+"</li>")
		}*/
		
		$(Books).each(function(index, element){
		
			if($(".Left_panel ul").html().indexOf("<li>" + $(element).attr("category")+"</li>") == -1){
			
			     $(".Left_panel ul").append("<li>" + $(element).attr("category")+"</li>");
			}
		});
		$(".Left_panel ul").prepend("<li>All</li>")
		
		
		
		$(".Left_panel ul li").click(function(){
			
			if($(this).text() == "All"){
				
			    Books = $(myBookData).children("bookstore").children("book");
				fillPro(1)
		}
			else{
				Books = $(myBookData).children("bookstore").children("book[category='"+$(this).text()+"']");
			    fillPro(1)
			}
			   
			
			 
			
			
		});
		

		
		
	}
	

	
	
	function fillPro(page){
		
		
		
		$(".main").html("");
		var MaxBook = page * 6 ;
		if($(Books).length < MaxBook){
			MaxBook = $(Books).length;
		}
		else{
			MaxBook = page * 6
		}
		
		
		proCoint = $(myBookData).children("bookstore").children("book").length / 6
		
		
		proCoint = Math.ceil(proCoint)
	
		
		
		$(".main").append("<ul class='pagination'></ul>")
		
		$(".pagination").prepend("<li>&laquo;</li>")
		for(p=1;p<=proCoint;p++){
			
			$(".pagination").append("<li>"+p+"</li>")
		}
		$(".pagination").append("<li>&raquo;</li>")
		
	
		$(".pagination li").click(function(){
			fillPro($(this).text())
		})
		
		
		for(i=(page - 1)*6;i<MaxBook;i++){
			
			$(".main").append("<section class='product'><h3 class='title'></h3><img src='#' /><p class='Author'></p><p class='price'><small></small></p></section>");
			
			$(".main section.product:last h3.title").text($(Books).eq(i).children("title").text())
			
			$(".main section.product:last p.price").text($(Books).eq(i).children("price").text()+"$")
			
			$(".main section.product:last img").attr("src","Product/"+$(Books).eq(i).children("id").text()+".jpg")
		}
		
		
	}
	
});