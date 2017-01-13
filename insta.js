var casper = require('casper').create({
	verbose: true,
	logLevel: 'warning'

});
var x = require('casper').selectXPath;
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');


//opens instagram home page
casper.start('https://www.instagram.com/?hl=en', function(){
		this.echo(this.getTitle());
		});



//waits two seconds then clicks on 'Log In' link
casper.wait(2000, function(){
	this.click(x('//*[@id="react-root"]/section/main/article/div[2]/div[2]/p/a'));
});



//fills out form with user info and clicks log in
casper.then(function(){
	this.sendKeys('input[name=username]', '');
	this.sendKeys('input[name=password]', '');

	casper.click(x('//*[@id="react-root"]/section/main/article/div[2]/div[1]/div/form/span/button'));

});





//waits two seconds to load then searches for tags with "San Diego" and clicks "Load more"
casper.wait(2000, function(){

	
		casper.open('https://www.instagram.com/explore/tags/sandiego/?hl=en').then(function(){
		this.click(x('//*[@id="react-root"]/section/main/article/div[2]/div[3]/a'));
		

		});
		});


//stores all the picture links in an array and opens each and likes them
casper.then(function(){


	//gets all the hrefs
    	var links = this.getElementsAttribute("a", "href");
	links = links.slice(9, links.length);

	//for each href check to see if it is a valid photo
	this.each(links, function(self, link){
			
		
		if (link.indexOf('p/BP') != -1){
		//waits 60 seconds (to avoid instagram bot detection) then likes the photo
		casper.wait(60000, function(){

				//opens photo and likes and prints to console
				casper.open('https://www.instagram.com' + link + '?tagged=sandiego').then(function(){
			
				this.click("a[href='#']");
				this.echo('Liked ' + link) ;		
				

			});
			

		});
	}	

	});

});










casper.run();
