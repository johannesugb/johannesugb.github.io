---
title: "JavaScript Test"
# last_modified_at: 2021-03-02T19:00:00+01:00
categories:
#  - Vulkan
tags:
#  - Vulkan
#  - synchronization
# header:
#   image: /assets/images/1500x500.jpg
---

<h1 style="color:green;">
    GeeksForGeeks
</h1>

<p> 
    <!-- Making a text input -->
    <input type="text" id="name" placeholder="Your name"/> 
    <input type="email" id="email" placeholder="Email"/> 
          
    <!-- Button to send data -->
    <button onclick="sendJSON()">Send JSON</button> 
  
    <!-- For printing result from server -->
    <p class="result" style="color:green"></p>   
</p>

<script>
function sendJSON(){ 
		
			let result = document.querySelector('.result'); 
			let name = document.querySelector('#name'); 
			let email = document.querySelector('#email'); 
			
			// Creating a XHR object 
			let xhr = new XMLHttpRequest(); 
			let url = "https://godbolt.org/api/compiler/g63/compile"; 
		
			// open a connection 
			xhr.open("POST", url, true); 

			// Set the request header i.e. which type of content you are sending 
			xhr.setRequestHeader("Content-Type", "application/json"); 

			// Create a state change callback 
			xhr.onreadystatechange = function () { 
				if (xhr.readyState === 4 && xhr.status === 200) { 

					// Print received data from server 
					result.innerHTML = this.responseText; 

				} 
			}; 

			// Converting JSON data to string 
			var data = JSON.stringify({
    "source": " #include <stdio.h>\n" +
      " int main () { " + 
      " float f = 70000.0f;                                     " +
      " int i = (int)f;                                     " +
      " int x = (float)(i+1);                                     " +
      " printf(\"%f\", x);                                     " +
      " return 1;                                     " +
      " }",
    "compiler": "g82",
    "options": {
        "userArguments": "-O3",
        "executeParameters": {
            "args": ["arg1", "arg2"],
            "stdin": "hello, world!"
        },
        "compilerOptions": {
            "executorRequest": true
        },
        "filters": {
            "execute": true
        },
        "tools": [],
        "libraries": [
            {"id": "openssl", "version": "111c"}
        ]
    },
    "lang": "c++",
    "allowStoreCodeDebug": true
}); 

			// Sending data with the request 
			xhr.send(data); 

            document.getElementById("demo").innerHTML ="sent";
		} 

</script>

