$(document).ready(function(){
    var sortname;
	$.getJSON( "http://codeit.pro/frontTestTask/company/getList", function( json ) {
   // var out = '';
    var ul = document.createElement('ul');
    ul.setAttribute("class", "list-group lstfirm");
    var len = json.list.length;
        $('.circle').text(len);
        for(i=0;i<len;i++){
           // out += '<p>' + json.list[i]['name']+json.list[i]['location']['name']+'</p>';
           var li = document.createElement('li');
           li.setAttribute("class", "list-group-item");
           li.innerHTML =json.list[i]['name']; 
           li.setAttribute("id",i);
           ul.appendChild(li);
        }
    $('.list').html(ul);
});
     $('.list').on('click', ".lstfirm .list-group-item", function(){
        $('.list-group-item').css("background-color", "white");
        var id = $(this).attr("id");
        $(this).css("background-color","beige");
           $.getJSON( "http://codeit.pro/frontTestTask/company/getList", function( json ) {
           var partners = json.list[id]['partners'];
               var shares = 0;
               for(i = 0; i<partners.length; i++)
                   {
                       shares+=partners[i]['value'];
                   }
                partners = ChooseSort(partners,"");
                $('.partners-body').empty();
               var div = document.createElement("div");
               div.setAttribute("class", "row");
               var ul = document.createElement('ul');
               ul.setAttribute("class", "list-group partners-list");
               for(i = 0;i<partners.length;i++)
                   {
                       console.log(partners[i].value);
                       var procentdiv = document.createElement("div");
                       procentdiv.setAttribute("class", "partners-circle");
                       procentdiv.innerHTML = Math.floor((partners[i]['value']/shares)*100) + "%";
                       /////////////////////подсчет процентов/////////////////////////////
                       var newline = document.createElement("div");
                       newline.setAttribute("class", "partners-line");
                       var partname = document.createElement("div");
                       partname.setAttribute("class", "partners-rectangle");
                       var div = document.createElement("div");
                       div.setAttribute("class", "partners-name");
                       div.innerHTML = partners[i]['name'];
                       partname.appendChild(div); 
                       ////////////////////вывод данных в списке////////////////////////
                       var li = document.createElement("li");
                       li.setAttribute("class", "list-group-item partners-element");
                       li.appendChild(procentdiv);
                       li.appendChild(newline);
                       li.appendChild(partname);
                       ul.appendChild(li);
                   }
               $('.partners').css("display","block");
               $('.partners-body').append(ul);
        });
 });
    $('.list').on('click', 'sort-name', function(){
        
    });
    function ChooseSort(company, sortby)
    {
        switch(sortby)
            {
                case "sharesDist":{
                    return company.sort(CompareSharesDist);
                }
                case "name":{
                    return company.sort(CompanyName);
                }
                case "nameDist":{
                    return company.sort(CompanyNameDist);
                }
                default:{
                    return company.sort(CompareShares);
            }
                
            }
    }
    function CompareShares(companyA, companyB)
    {
        return companyB.value-companyA.value;
    }
    function CompareSharesDist(companyA, companyB)
    {
        return companyA.value-companyB.value;
    }
    function CompanyName(companyA,companyB){
        return companyB.name-companyB.name;
    }
    function CompanyNameDist(companyA,companyB)
    {
        return companyA.name=companyB.name;
    }
               
});
