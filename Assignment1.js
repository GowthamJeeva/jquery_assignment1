$(function() {
 		var res="";
         var res1=[];
         var res2=[];
         var anchor="<li><input type='button' class='myClass btn btn-secondary btn-lg btn-block' value=";
 var $pagination = $('#results1');
    var defaultOpts = {
        totalPages: 20
    };
    $pagination.twbsPagination(defaultOpts);


 $(".search_box").on('keyup',function() {
        // getting the value that user typed
        console.log($("#filter").val());
        if($("#filter").val()==="All Movies"){
                            $("#results").html("");


        var searchString    = $("#search_box").val();
        // if searchString is not empty
        if(searchString) {
            // ajax call
            
            $.ajax({
                type: "POST",
                url: "http://www.omdbapi.com/?s="+searchString+"page=2",
                
                beforeSend: function(html) { // this happen before actual call
                	
                    $("#results1").html(''); 
                    $("#searchresults").show();
                    $(".word").html(searchString);
               },

               success: function(html){ 
            var totalPages = html.newTotalPages;
            var currentPage = $pagination.twbsPagination('getCurrentPage');
            $pagination.twbsPagination('destroy');
            $pagination.twbsPagination($.extend({}, defaultOpts, {
                startPage: currentPage,
                totalPages: totalPages
            }));
               		
               	res1=html.Search;
               	res="";
               	res1.forEach(function(d){
  						
               	
               
               			res+=anchor+'"'+d.Title+'" data-imdb="'+d['imdbID']+'" /></li>';
               		});
               	
               	console.log("hai1");
             
                   $("#results1").show();
                    $("#results1").append(res);

                    res="";
                    res1=[];
                    

              }
            });    

        }
        else
        {
        	$("#results1").html("");
        	       $('#searchresults').hide(); //hides button

        }

        return false;
}

else
		 
                {            $("#results").html("");


        var searchString    = $("#search_box").val();
        // if searchString is not empty
        if(searchString) {
            // ajax call
            
            $.ajax({
                type: "POST",
                url: "http://www.omdbapi.com/?s="+searchString,
                
                beforeSend: function(html) { // this happen before actual call
                	//console.log(data);
                    $("#results1").html(''); 
                    $("#searchresults").show();
                    $(".word").html(searchString);
               },

               success: function(html){ // this happen after we get result

               	res1=html.Search;

               	res="";
               	res1.forEach(function(d){
  						$.ajax({
                type: "POST",
                url: "http://www.omdbapi.com/?i="+d['imdbID'],
                success: function(html1){
                	
                		res2.push(html1);

                }
               
               })
  						});
               	res2.sort(function(a, b) { 
                			a=parseFloat(a.imdbRating);
                			b=parseFloat(b.imdbRating);
  return  a-b ;
});console.log(res2);
               	res2.reverse();


               	res2.forEach(function(d1){
               		                		console.log("hai");

               			res+=anchor+'"'+d1.Title+'" data-imdb="'+d1['imdbID']+'" /></li>';
               		});
               	
               	
                   $("#results1").show();
                    $("#results1").append(res);
                    $("#results").pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
                    res="";
                    res1=[];
                    res2=[];
                    //searchString="";

              }
            });    

        }
        else
        {
        	$("#results1").html("");
        	       $('#searchresults').hide(); //hides button

        }

        return false;
}
    });





   






		
	


$(".update").delegate('.myClass','click',function() {
                    $("#results").html("");

        var searchString    = $(this).data("imdb");
        
        // if searchString is not empty
        if(searchString) {
            // ajax call
          $.ajax({
                type: "POST",
                url: "http://www.omdbapi.com/?i="+searchString.trim(),
               
               success:function(html){ // this happen after we get result
         			var title="Movie title : "+html['Title'];
         			var poster=html.Poster;
         			var rating="IMDB_rating : "+html.imdbRating;
         			var votes="IMDB_votes : "+html.imdbVotes;
         			var timing="Movie Runtime : "+html.Runtime;
         			var actors="Actors : "+html.Actors;
         			var director="Directed by "+html.Director;
         			var result1="<div class='output'><h3>"+title+"</h3><br><img src='"+poster+"' alt='Movie image'/><br><p>"+rating+"<br>"+votes+"<br>"+timing+"<br>"+actors+"<br>"+director+"<br></p></div>";


               	//res1=html;
               	//res="";
               /*	res1.forEach(function(d){
               		
               			res+=anchor+search1+d["imdbID"]+"' "+target+" >"+d["Title"]+"</a><br>";
               		
               	});*/
                   $("#results").show();
                    $("#results").append(result1);
                    res="";
              }
          }
            );    

        }

        return false;

    });













   
});