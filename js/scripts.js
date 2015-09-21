$(window).on('load', function(){ //wait for HTML to load
	

	$.getJSON(
			'https://api.instagram.com/v1/users/269781028/media/recent?callback=?',
			{
				access_token:'269781028.1677ed0.a7691385a9c34478b74024e51a787fe2',
				count: '33'
			},
			function(json){
				console.log(json)
				//set data to use later
				//set the initial image 
				var index = 0;	


				if (json.data[index].type === "image") {
					
					$ ("#image-container img").attr('src', json.data[index].images.standard_resolution.url);
					$ ("#image-container video").hide();
				}
					else if (json.data[index].type === "video"){
						$ ("#image-container video").attr('src', json.data[index].videos.standard_resolution.url);
						$ ("#image-container img").hide();
				};



				$ ("#comment-capture").text(_.get(json.data[index], "caption.text") || " ");

			    var mapCanvas = $('#map').get(0);

			    var location = json.data[index].location;

			    var mapOptions = {
			          center: new google.maps.LatLng(location.latitude, location.longitude),
			          zoom: 11,
			          mapTypeId: google.maps.MapTypeId.ROADMAP
			        };

			    var map = new google.maps.Map(mapCanvas, mapOptions);

			    _.each(json.data, function(instagramPost, i){

			    	location = instagramPost.location;


					var marker = new google.maps.Marker({
				    	position: new google.maps.LatLng(location.latitude, location.longitude),
				    	map: map,
				    	imageIndex: i
					});
					
					marker.addListener('click', function() {
					    map.panTo(marker.getPosition());
					    
					    if (json.data[this.imageIndex].type === "image") {
							$ ("#image-container img").show().attr('src', json.data[this.imageIndex].images.standard_resolution.url);
							$ ("#image-container video").hide();

						}
							else if (json.data[this.imageIndex].type === "video"){
								$ ("#image-container video").show().attr('src', json.data[this.imageIndex].videos.standard_resolution.url);
								$ ("#image-container img").hide();
						};

						index = this.imageIndex;

					    $ ("#comment-capture").text(_.get(json.data[this.imageIndex], "caption.text") || " ");

					    if (this.imageIndex === 0) {
						$ ("#right-arrow").addClass('faded')
						};

						if (this.imageIndex < json.data.length - 1) {
							$ ("#left-arrow").removeClass('faded')
						};

						if (this.imageIndex > 0) {
						$ ("#right-arrow").removeClass('faded')
						};

						if (this.imageIndex === json.data.length - 1) {
							$ ("#left-arrow").addClass('faded')
						 };
					});
					
			    });

					

			    
				$ ("#right-arrow").addClass('faded');



				$ ("#right-arrow").on("click", function(){ //set up event handler
					goright ();
				});

				$ ("#left-arrow").on("click", function (){
					goleft ();
				});


				$ (window).on("keydown", function(event){ //set up event handler
					
					if(event.which == 37) { // left
					    goleft ();
					 } else if(event.which == 39) { // right
					    goright ();
					 }
				});


				function goright () {
					if (index >= 0) {
						index--;

						if (json.data[index].type === "image") {
							$ ("#image-container img").show().attr('src', json.data[index].images.standard_resolution.url);
							$ ("#image-container video").hide();
						}
							else if (json.data[index].type === "video"){
								$ ("#image-container video").show().attr('src', json.data[index].videos.standard_resolution.url);
								$ ("#image-container img").hide();
						};

						$ ("#comment-capture").text((_.get(json.data[index], "caption.text") || " ")+" @ "+(_.get(json.data[index], "location.name"))) ;

						location = json.data[index].location;

						map.panTo(new google.maps.LatLng(location.latitude, location.longitude));
						
					};

					if (index === 0) {
						$ ("#right-arrow").addClass('faded')
					};

					if (index <= json.data.length - 2) {
						$ ("#left-arrow").removeClass('faded')
					};

				};

				function goleft () {
					if (index < json.data.length - 1) {
						index++;

						if (json.data[index].type === "image") {
							$ ("#image-container img").show().attr('src', json.data[index].images.standard_resolution.url);
							$ ("#image-container video").hide();
						}
							else if (json.data[index].type === "video"){
								$ ("#image-container video").show().attr('src', json.data[index].videos.standard_resolution.url);
								$ ("#image-container img").hide();
						};

						$ ("#comment-capture").text(_.get(json.data[index], "caption.text") || " ");

						location = json.data[index].location;
						
						map.panTo(new google.maps.LatLng(location.latitude, location.longitude));
						
					};

					if (index >= 1) {
						console.log(index, json.data.length);
						$ ("#right-arrow").removeClass('faded')
					};

					if (index === json.data.length - 1) {
						$ ("#left-arrow").addClass('faded')
					};
				};
					

				
				
				

			}

		);



})

