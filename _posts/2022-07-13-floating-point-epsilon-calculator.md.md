---
title: "Floating Point Epsilon Calculator"
last_modified_at: 2022-07-13T11:49:00+02:00
categories:
#  - CPU-Programming
#  - Tools
tags:
#  - C++
# header:
#   image: /assets/images/1500x500.jpg
---

When using floating point variables, there's always the danger that a certain value cannot be represented exactly. Therefore, oftentimes epsilon values need to be used when checking or comparing results of floating point computations. **But which epsilon to use?** The answer is: **It depends!** More precisely, it depends on the range of values that you are using for your computations, which is where this small online tool comes into play: The Floating Point Epsilon Calculator will tell you the _largest difference between two consecutive floating point values within a given range of values_---use that as your epsilon! Furthermore, the precision across the given range of values is plotted.

**Operating instructions:** Select the data type, enter lower and upper bounds of the floating point range of interest, then hit the `[Calculate]` button and await the resulting epsilon and precision chart across the entered range.

<div style="display:block;">
  <div style="margin: 0px 0px 0px 0px;">
    Alternatively, select one of the predefined ranges:
  </div>
  <div style="float:left; text-align:left; margin: 0px 10px 0px 0px;">
    <button onclick="goGoPredefinedRange(0.0,  0.3);" style="padding: 2px 5px; margin: 0 0 0 0;">[0, 0.3]</button>
  </div>
  <div style="float:left; text-align:left; margin: 0px 10px 0px 0px;">
    <button onclick="goGoPredefinedRange(0.0,  1.0);" style="padding: 2px 5px; margin: 0 0 0 0;">[0,  1]</button>
  </div>
  <div style="float:left; text-align:left; margin: 0px 10px 0px 0px;">
    <button onclick="goGoPredefinedRange(-1.0,  1.0);" style="padding: 2px 5px; margin: 0 0 0 0;">[-1,  1]</button>
  </div>
  <div style="float:left; text-align:left; margin: 0px 10px 0px 0px;">
    <button onclick="goGoPredefinedRange(-100.0,  100.0);" style="padding: 2px 5px; margin: 0 0 0 0;">[-100,  100]</button>
  </div>
  <div style="float:left; text-align:left; margin: 0px 10px 0px 0px;">
    <button onclick="goGoPredefinedRange(0.0,  10000.0);" style="padding: 2px 5px; margin: 0 0 0 0;">[0,  10000]</button>
  </div>
  <div style="float:left; text-align:left; margin: 0px 10px 0px 0px;">
    <button onclick="goGoPredefinedRange(10000.0,  1000000000.0);" style="padding: 2px 5px; margin: 0 0 0 0;">[10000,  1000000000]</button>
  </div>
  <div style="clear:both;">&nbsp;</div>
</div>

<p> 
<div style="display:block; border: solid 4px rgb(0, 203, 230); border-radius: 10px; padding:10px; margin: 10px 0 0 0;">
  <div style="margin: 0px 0px 5px 0px;">
    Calculate precision of
  </div>
  <div style="float:left; text-align:left; margin: 0px 0px 0px 0px;">
    <select name="dataType" id="dataType" style="background-color: white; color: black; font-size: 0.9em;">
	  <option value="float" selected="selected">float</option>
	  <option value="double">double</option>
	  <option value="long double">long double</option>
    </select>
  </div>
  <div style="float:left; text-align:left;  margin: 0px 0px 0px 5px;">
    between:
  </div>
  <div style="float:left; text-align:left; margin: 0px 0px 0px 5px;">
    <input type="number" step="any" id="fromVal" placeholder="lower bound" style="width: 130px; background-color: white; color: black; font-size: 0.9em;"/>
  </div>
  <div style="float:left; text-align:left; margin: 0px 0px 0px 5px;">
    and:
  </div>
  <div style="float:left; text-align:left; margin: 0px 0px 0px 5px;">
    <input type="number" step="any" id="toVal" placeholder="upper bound" style="width: 130px; background-color: white; color: black; font-size: 0.9em;">
  </div>
  <div style="clear: both; position: relative;">
	<img src="/assets/images/loading-ani-ripple-1s-200px.gif" style="position: absolute; width:40px; height:40px; right:0%; visibility: hidden;" id="loadingIcon" />
    <!-- Button to send data -->
	<center>
		<button id="sendButton" onclick="myAjaxGoGo();" style="padding: 5px 20px; margin: 5px 0 0 0;">
			Calculate
		</button>
	</center>
  </div>
  <div style="margin: 0px 0px 10px 0px;">
    Result:
  </div>
  <div class="language-cpp highlighter-rouge" style="font-size: 1.0em;"><div class="highlight"><pre class="highlight"><code><span class="k">constexpr</span> <span class="k" id="resultDataType">float</span> <span class="n">epsilon</span> <span class="o">=</span> <span class="mi" id="resultEpsilonValue">?</span><span class="p">;</span></code></pre></div></div>
</div>
	


    <div>
      <canvas id="myChart"></canvas>
   </div>
</p>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const chartConfig = {
	type: 'line',
	options: {
		scales: {
			y: {
				reverse: true
			}
		}
     }
};
const myChart = new Chart(document.getElementById('myChart'), chartConfig);
myChart.reset();
	
function goGoPredefinedRange(from, to){
	document.getElementById("fromVal").value = from;
	document.getElementById("toVal").value = to;
	myAjaxGoGo();
}

function myAjaxGoGo(){ 

	let dataType = document.getElementById("dataType").value;
	if (dataType != "float" && dataType != "double" && dataType != "long double") {
		alert("Invalid data type selected: " + dataType);
		return;
	}
	
	let fromVal = document.getElementById("fromVal").value;
	// Validate fromVal 
	var patternForInputVal=/^-?(\d+(\.\d+)?|\.\d+)$/;
	if (!patternForInputVal.test(fromVal)) {
		alert("Invalid number in textbox: " + fromVal);
		return;
	}
	
	let toVal = document.getElementById("toVal").value;
	// Validate toVal 
	if (!patternForInputVal.test(toVal)) {
		alert("Invalid number in textbox: " + toVal);
		return;
	}

	let resultDataType = document.getElementById("resultDataType");
	let resultEpsilonValue = document.getElementById("resultEpsilonValue");
	resultDataType.innerHTML = dataType;
	resultEpsilonValue.innerHTML = "?";
	
	// Creating a XHR object 
	let xhr = new XMLHttpRequest(); 
	let url = "https://godbolt.org/api/compiler/g63/compile"; 

	// open a connection 
	xhr.open("POST", url, true); 

	// Set the request header i.e. which type of content you are sending 
	xhr.setRequestHeader("Content-Type", "application/json"); 

	// Create a state change callback 
	xhr.onreadystatechange = function () { 
	
		document.getElementById("sendButton").disabled=false;
		document.getElementById("loadingIcon").style.visibility="hidden";
	
		if (xhr.readyState === 4 && xhr.status === 200) { 

			// Analyze server result:
			var location = this.responseText.lastIndexOf("####RESULT:");
			if (-1 == location) {
				resultEpsilonValue.innerHTML = this.responseText; 
			}
			else {
				// Got something that looks like our expected result:
				const resultLines = this.responseText.substring(location + "####RESULT:".length).split("\n");
				if (resultLines.length >= 1) {
					resultEpsilonValue.innerHTML = resultLines[0];
					
					// Results for chart in lines [1] and [2]:
					if (resultLines.length >= 3) {
						const labels = resultLines[1].split(",");
						const precisions = resultLines[2].split(",").map(x => parseFloat(x));

						const chartData = {
							labels: labels,
							datasets: [{
							  label: 'Precision',
							  backgroundColor: 'rgb(0, 203, 230)',
							  borderColor: 'rgb(0, 203, 230)',
							  data: precisions,
							}]
						  };

						chartConfig.data = chartData;
						myChart.update('active');
					}
				}
			}
		} 
	}; 
			
	var cppCode = 
	"#include <iostream>                                                                         \n" +
	"#include <algorithm>                                                                        \n" +
	"#include <array>                                                                            \n" +
	"#include <cmath>                                                                            \n" +
	"#include <limits>                                                                           \n" +
	"double precision_for(double reference) {                                                    \n" +
	"    double more = std::nextafter(reference,  std::numeric_limits<double>::infinity());      \n" +
	"	double less = std::nextafter(reference, -std::numeric_limits<double>::infinity());       \n" +
	"    double precision = std::max(more - reference, reference - less);                        \n" +
	"	return precision;                                                                        \n" +
	"}                                                                                           \n" +
	"struct result {                                                                             \n" +
	"    double mValue;                                                                          \n" +
	"    double mPrecision;                                                                      \n" +
	"};                                                                                          \n" +
	"int main () {                                                                               \n" +
	"    double from = static_cast<double>({FROM});                                              \n" +
	"    double to = static_cast<double>({TO});                                                  \n" +
	"    constexpr int n = 30;                                                                   \n" +
	"    double delta = (to - from) / static_cast<double>(n);                                    \n" +
	"    std::array<result, n + 1> results;                                                      \n" +
	"    for (int i = 0; i < n; ++i) {                                                           \n" +
	"        results[i].mValue = from + static_cast<double>(i) * delta;                          \n" +
	"        results[i].mPrecision = precision_for(results[i].mValue);                           \n" +
	"    }                                                                                       \n" +
	"    results[n] = { to, precision_for(to) };                                                 \n" +
	"    double worstPrecision = std::max(results.front().mPrecision, results.back().mPrecision);\n" +
	"                                                                                            \n" +
	"    std::cout << \"####RESULT:\" << std::defaultfloat << worstPrecision << std::endl;       \n" +
	"    std::cout << std::fixed;                                                                \n" +
	"    for (int i = 0; i < n; ++i) {                                                           \n" +
	"        std::cout << results[i].mValue << \",\";                                            \n" +
	"    }                                                                                       \n" +
	"    std::cout << results[n].mValue << std::endl;                                            \n" +
	"    std::cout << std::defaultfloat;                                                         \n" +
	"    for (int i = 0; i < n; ++i) {                                                           \n" +
	"        std::cout << results[i].mPrecision << \",\";                                        \n" +
	"    }                                                                                       \n" +
	"    std::cout << results[n].mPrecision << std::endl;                                        \n" +
	"    return 1;                                                                               \n" +
	"}\n";

	// Converting JSON data to string 
	var data = JSON.stringify({
		"source": cppCode.replace("{FROM}", fromVal).replace("{TO}", toVal).replaceAll("double", dataType),
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

	document.getElementById("sendButton").disabled=true;
	document.getElementById("loadingIcon").style.visibility="visible";
} 

</script>

	
# How It Works
	
The calculations are performed in C++ via the fantastic and invaluable "Compiler Explorer" at [godbolt.org](https://godbolt.org/). The calculations use [`std::nextafter`](https://en.cppreference.com/w/cpp/numeric/math/nextafter) to get the smallest adjacent floating point value to a given reference value => this is the proposed epsilon. For a range of values, the proposed epsilon value can always w.l.o.g. be calculated by taking the maximum of the lower bound's epsilon and the upper bound's epsilon. 
	
The following C++ code is used to calculate the floating point precision around a given reference value (in this case for the `double` data type):
```cpp
double precision_for(double reference) {
  double more = std::nextafter(reference,  std::numeric_limits<double>::infinity());
  double less = std::nextafter(reference, -std::numeric_limits<double>::infinity());
  double precision = std::max(more - reference, reference - less);
  return precision;
}
```
	
	
# Further Information
	
Other sources have done a great job of describing floating point numbers and their varying precision. Please refer to some of the following great resources:
- [Alan Wolfe - Demystifying Floating Point Precision](https://blog.demofox.org/2017/11/21/floating-point-precision/)
- [Fabien Sanglard - Floating Point Visually Explained](https://fabiensanglard.net/floating_point_visually_explained/)
- [Bartlomiej Filipek - Three Myths About Floating-Point Numbers](https://www.cppstories.com/2021/06/floating-point-myths/)
	
