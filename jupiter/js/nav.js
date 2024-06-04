var orignData = [],
    orignDataLen,
    orignDataFirstDate = new Date,
    orignDataLastDate = new Date,
    getData = [],
    thirtyDayData = [],
    // --- 按鍵 ---
    btnWeek = $('#btnW'), // 週搜尋按鈕
    btnMonth = $('#btnM'), // 月搜尋按鈕
    btnThreeMonth = $('#btnTM'), // 三月內搜尋按鈕
    btnSixMonth = $('#btnSM'), // 六月內搜尋按鈕
    // --- datepicker ---
    dateStart = $('#date-start'),
    dateEnd = $( "#date-end" ),
    dateStartVal = dateStart.datepicker( "getDate" ), // dateStart 所選日期, 未選 == null
    dateEndVal = dateEnd.datepicker( "getDate" ), // dateEnd 所選日期, 未選 == null
    // --- 畫面上要填入資料的地方 ---
    chartOuter = $('#chart_content .chart'), // 要畫 SVG 的區塊
    thirtyDay = $('#thirty_day_outer'),
    thirtyDayLi = $('#thirty_day_outer .thirty_day ul li'), // 近三十日淨值區塊的 li
    fundName = $('#fund_name'),
    fundNote = $('#fund_note'),
    fundClassification = $('#fund_classification'),
    // --- hover方塊 ---
    tooltip = d3.select("body")
        .append("div")
        .attr("class","tooltip")
        .style({"opacity": 0,"z-index": -1});

// --- AJAX 取得資料並處理資料格式 + 更新 datepicker 起始日以及最近日 ---
    // function makeRequest(url, b){
    //     var request = new XMLHttpRequest();
    //     request.onload = function() {
    //         var response = JSON.parse(this.responseText);
    //         if(request.status >= 200 && request.status < 400)
    //          {
    //             orignData = response;
    //             orignDataLen = orignData.info.length;
    //             for(i=0; i < orignDataLen; i++){
    //                 orignData.info[i].dates = new Date(orignData.info[i].dates); // 字串轉時間格式
    //                 orignData.info[i].val = parseFloat(orignData.info[i].val); // 字串轉一下數值
    //             };
    //             orignDataFirstDate = orignData.info[0].dates;
    //             orignDataLastDate = orignData.info[orignDataLen - 1].dates;
    //             dateStart.datepicker( "option", "maxDate", new Date(orignDataLastDate) );
    //             dateStart.datepicker( "option", "minDate", new Date(orignDataFirstDate) );
    //             dateEnd.datepicker( "option", "maxDate", new Date(orignDataLastDate) );
    //             dateEnd.datepicker( "option", "minDate", new Date(orignDataFirstDate) );

    //             btnWeek.addClass('active');
    //             btnWeek.siblings().removeClass('active');

    //             reqDarwInterval(7);
    //             fillData();
    //             fillTitle();
    //         }
    //     }
    //     request.open('POST', url, true);
    //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //     request.send(b);
    // }

    function makeRequest(data){
        orignData = data;
        orignDataLen = orignData.info.length;
        getData = [];
        if(orignDataLen < 1){
            chartOuter.empty();
            drawChart();
            thirtyDay.css('display', 'none');
            fundName[0].innerHTML = null;
            fundNote[0].innerHTML = null;
            fundClassification[0].innerHTML = null;
            alert("暫無資料");
        } else {
            for(i=0; i < orignDataLen; i++){
                orignData.info[i].dates = new Date(orignData.info[i].dates); // 字串轉時間格式
                orignData.info[i].val = parseFloat(orignData.info[i].val); // 字串轉一下數值
            };
            orignDataFirstDate = orignData.info[0].dates;
            orignDataLastDate = orignData.info[orignDataLen - 1].dates;
            dateStart.datepicker( "option", "maxDate", new Date(orignDataLastDate) );
            dateStart.datepicker( "option", "minDate", new Date(orignDataFirstDate) );
            dateEnd.datepicker( "option", "maxDate", new Date(orignDataLastDate) );
            dateEnd.datepicker( "option", "minDate", new Date(orignDataFirstDate) );

            btnWeek.addClass('active');
            btnWeek.siblings().removeClass('active');

            reqDarwInterval(7);
            fillData();
            fillTitle();
        }
    }

// --- 取得最後 getLen 筆資料到 getData[] ---
    function reqDarwInterval(getLen){
        getData = [];
        for(k = 0; k < orignDataLen; k++){
            if(k < orignDataLen - getLen){
                continue;
            }else{
                getData.push(orignData.info[k]);
            }
        };
        chartOuter.empty();
        drawChart();
    }

// --- 取得一段時間的資料到 getData[] ---
    function reqDarwTime(start, end){
        console.log(start + ' -- ' + end);
        getData = [];
        start = Date.parse(start).valueOf();
        end = Date.parse(end).valueOf();
        for(k = 0; k < orignDataLen; k++){
            if(start <= Date.parse(orignData.info[k].dates).valueOf() && end >= Date.parse(orignData.info[k].dates).valueOf()){
                getData.push(orignData.info[k]);
            }
        }
        chartOuter.empty();
        drawChart();
    }

// --- 繪圖主函式, 使用 getData[]生成圖表 ---
    function drawChart(){
    // --- 宣告長寬變數 ---
        var winW = window.screen.width,
            w = $(".chart").width(),
            h = 275;
        if(winW <= 600){h = 180;} 

    // --- 定義繪製 SVG函式 ---
        var svgStart = d3.select("#chart_content .chart")
            .append("svg")
            .attr({
                "width": w,
                "height": h
            }); 

    // --- 綁資料 定義 D3比例尺 ---
        var minX = d3.min(getData, function(d){return d.dates}),
            maxX = d3.max(getData, function(d){return d.dates}),
            minY = d3.min(getData, function(d){return d.val}),
            maxY = d3.max(getData, function(d){return d.val}), 
            minY = minY - minY*0.05,
            maxY = maxY + maxY*0.05;
        
        // 資料範圍
        var scaleX = d3.time.scale()
            .domain([minX, maxX])
            .range([0,(w - 85)]);
        var scaleY = d3.scale.linear()
            .domain([minY, maxY]) 
            .range([h,40]); 
    
    // --- 套用定義出的比例尺 定義繪製 SVG線段 + 區域的布局(?) ---
        var linePrepare = d3.svg.line()
            .x(function(d) { return scaleX(d.dates); })
            .y(h); 
        var areaPrepare = d3.svg.area()
            .x(function(d) { return scaleX(d.dates); })
            .y0(h)
            .y1(h);
        var line = d3.svg.line()
            .x(function(d) { return scaleX(d.dates); })
            .y(function(d) { return scaleY(d.val); }); 
        var area = d3.svg.area()
            .x(function(d) { return scaleX(d.dates); })
            .y0(h)
            .y1(function(d) { return scaleY(d.val); });
    
    // --- 定義D3座標軸 ---
        var xTickNum = 3,
            yTickNum = 5; 
        if(winW <= 700){xTickNum = 2;} 

        var axisX = d3.svg.axis()
            .scale(scaleX) 
            .orient("bottom")
            .tickFormat(d3.time.format("%Y.%m.%d")) 
            .ticks(xTickNum);
        var axisY = d3.svg.axis()
            .scale(scaleY)
            .orient("left")
            .tickFormat(function(d){return Math.round(d*10)/10;})
            .ticks(yTickNum);

    // --- 定義D3座標格線 ---
        var axisXGrid = d3.svg.axis() 
            .scale(scaleX)
            .orient("bottom")
            .ticks(0)
            .tickFormat("")
            .tickSize(-h+30,0);
        var axisYGrid = d3.svg.axis()
            .scale(scaleY)
            .orient("left")
            .ticks(yTickNum)
            .tickFormat("")
            .tickSize(-w+85,0); 

    // --- 定義 SVG漸層 ---
        var defs = svgStart.append("defs");
        var linearGradient = defs.append("linearGradient")
            .attr({
                "id":"linearColor",
                "x1":"0%",
                "x2":"0%",
                "y1":"0%",
                "y2":"100%"
            });
        linearGradient.append("stop")
            .attr("offset","35%")
            .style("stop-color","rgba(222,55,0,.3)");
        linearGradient.append("stop")
            .attr("offset","100%")
            .style("stop-color","rgba(222,55,0,0)");

    // --- 定義 hover方塊 ---
        var tooltip = d3.select("body")
            .append("div")
            .attr("class","tooltip")
            .style({"opacity": 0,"z-index": -1});

    // ========== 使用函式 ==========
    // --- 繪製座標 ---
        svgStart.append('g')
            .call(axisX)
            .attr({
                'fill':'none',
                'stroke':'#ddd',
                'transform':'translate(50,'+(h-30)+')' 
            })
            .selectAll('text')
            .attr({
                'fill':'#aaa',
                'stroke':'none',
                'transform':'translate(0,10)'
            })
            .style({
                'font-size':'12px',
                'letter-spacing': '1px'
            });
        svgStart.append('g')
            .call(axisY)
            .attr({
                'fill':'none',
                'stroke':'#ddd',
                'transform':'translate(50,-30)'
            })
            .selectAll('text')
            .attr({
                'fill':'#000',
                'stroke':'none',
                'transform':'translate(-5,0)'
            })
            .style({
                'font-size':'12px',
                'letter-spacing': '1px'
            });

    // --- 繪製格線 ---
        svgStart.append('g')
            .call(axisXGrid)
            .attr({
                'fill':'none',
                'stroke':'#ddd',
                'transform':'translate(50,'+(h-30)+')' 
            });
        svgStart.append('g')
            .call(axisYGrid)
            .attr({
                'fill':'none',
                'stroke':'#ddd',
                'stroke-dasharray':'5',
                'transform':'translate(50,-30)'
            });

    // --- 繪製線段 + 漸層區塊 ---
        svgStart.append('path')
        .attr({
            'd':linePrepare(getData),
            'stroke':'#DE3700',
            'stroke-width': '2px',
            'fill':'none',
            'transform':'translate(50,-30)' 
        })
        .transition().duration(350).ease('cubic-out').attr({
            'd':line(getData),
            'stroke':'#DE3700',
            'stroke-width': '2px',
            'fill':'none',
            'transform':'translate(50,-30)' 
        });
        svgStart.append('path')
            .attr({
                'd':areaPrepare(getData),
                'fill':'url(#' + linearGradient.attr('id') + ')',
                'transform':'translate(50,-30)' 
            })
            .transition().duration(350).ease('cubic-out').attr({
                'd':area(getData),
                'fill':'url(#' + linearGradient.attr('id') + ')',
                'transform':'translate(50,-30)' 
            });

    // --- 繪製線段上的點 + hover標籤 ---
        var _x = d3.time.format("%Y.%m.%d");
        var circle = svgStart.append('g')
            .selectAll('circle')
            .data(getData)
            .enter()
            .append('circle')
            .attr({
                'fill': '#DE3700',
                'opacity': 0,
                'transform':'translate(50,-30)',
                'r': 6
            })
            .attr("cx", function(d) {return scaleX(d.dates);})
            .attr("cy", function(d) {return scaleY(d.val);})

        circle.on("mouseover",function(d){
            tooltip.html( _x(d.dates) + "<br>" + "淨值: " + "<span class='txt-bold'>" + d.val.toFixed(4) + "</span>")
                .style({
                    "left": (d3.event.pageX) + "px",
                    "top": (d3.event.pageY + 20) + "px",
                    "opacity": 1,
                    "z-index": 1
                }); // hover標籤相關的
            $(this).attr({'opacity': 1}); // 圓點的透明度改為1
        });
        circle.on("mousemove",function(){
            tooltip.style({
                "left": (d3.event.pageX) + "px",
                "top": (d3.event.pageY + 20) + "px"
            });
        });
        circle.on("mouseout",function(){
            tooltip.style({
                "left": 0 + "px",
                "top": 0 + "px",
                "opacity": 0,
                "z-index": -1
            });
            $(this).attr({'opacity': 0});
        });
    }

// --- 篩選資料並填入'近三十日淨值'區塊 ---
    function fillData(){
        thirtyDay.css('display', 'block');
        thirtyDayData = [];
        for(k = 0; k < orignDataLen; k++){
            if(k < orignDataLen - 30){
                continue;
            }else{
                thirtyDayData.push(orignData.info[k]);
            }
        };
        console.log(thirtyDayLi);
        console.log(thirtyDayData);
        for(j = 0; j < thirtyDayData.length; j++){
            var Y, M, D, str;
            Y = thirtyDayData[j].dates.getFullYear();
            M = thirtyDayData[j].dates.getMonth();
            D = thirtyDayData[j].dates.getDate();
            str = Y + '.' + (M + 1) + '.' + D;
            thirtyDayLi[j].innerHTML = '<div class="col50">' + str + '</div>' + '<div class="col50 val txt-black">' + thirtyDayData[j].val.toFixed(4) + '</div>';
        }
    }

// --- 填入基金名稱等資訊 ---
    function fillTitle(){
        fundName[0].innerHTML = orignData.name;
        if(orignData.note != null && orignData.note !='' ){
            fundNote[0].innerHTML = orignData.note ;
        }
        fundClassification[0].innerHTML = orignData.classification + "/" + orignData.currency;
    }

// --- 週 / 月 / 三月內 / 六月內搜尋按鈕 onclick function ---
    function btnClick(btn, days){
        btn.on('click', function(){
            $(this).addClass('active');
            $(this).siblings().removeClass('active'); 
            reqDarwInterval(days); 
        });
    }

    btnClick(btnWeek, 7);
    btnClick(btnMonth, 30);
    btnClick(btnThreeMonth, 90);
    btnClick(btnSixMonth, 180);

// --- datepicker onchange function ---
    dateStart.datepicker();
    dateEnd.datepicker();

    dateStart.on('change', function(){
        var afterDateStartVal = dateStart.datepicker("getDate"); // 宣告 afterDateStartVal 為 dateStart 所選日期
        dateStartVal = dateStart.datepicker("getDate"); // 更新 dateStart 所選日期
        afterDateStartVal = new Date(afterDateStartVal.setDate(afterDateStartVal.getDate() + 1)); // afterDateStartVal 為 dateStart 所選日期次一日
        dateEnd.datepicker( "option", "minDate", afterDateStartVal);
        if(dateEndVal != null){
            reqDarwTime(dateStartVal, dateEndVal);
            btnWeek.removeClass('active');
            btnWeek.siblings().removeClass('active');
        }
    });
    dateEnd.on('change', function(){
        var beforeDateEndVal = dateEnd.datepicker("getDate"); // 宣告 afterDateEndVal 為 dateEnd 所選日期
        dateEndVal = dateEnd.datepicker("getDate"); // 更新 dateEnd 所選日期
        beforeDateEndVal = new Date(beforeDateEndVal.setDate(beforeDateEndVal.getDate() - 1)); // afterDateEndVal 為 dateEnd 所選日期前一日
        dateStart.datepicker( "option", "maxDate", new Date(beforeDateEndVal) );
        if(dateStartVal != null){
            reqDarwTime(dateStartVal, dateEndVal);
            btnWeek.removeClass('active');
            btnWeek.siblings().removeClass('active');
        }
    });

    drawChart();