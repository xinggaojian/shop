$(function(){var i=1,t=function(){$(document).on("touchend",".js-more-article",function(){i++,a.loadArticleList()})},a={loadArticleList:function(){$.ajax({url:"/api/article/tagarticle",type:"POST",data:{page:i,typeid:typeid},dataType:"JSON",success:function(i){var t=i?i.data||[]:[],a="";t.forEach(function(i){a+='<a href="https://m.imooc.com/article/'+i.id+'" class="list-item',""!==i.img&&(a+=" has-img"),a+='">                            <div>                                <p>'+i.title+"</p>                                <p>",2==i.is_original&&(a+='<span class="original">原创</span>'),a+="<span>"+i.view+"浏览·"+i.push+"推荐·"+i.comment+"评论</span>                                </p>                            </div>",""!==i.img&&(a+=' <img src="'+i.img+'" alt="">'),a+="</a>"}),$("#article_list").append(a),t.length<20?($(".js-more-article").hide(),$(".js-no-result").show()):($(".js-no-result").hide(),$(".js-more-article").show())}})}},e=function(){t()};e()});