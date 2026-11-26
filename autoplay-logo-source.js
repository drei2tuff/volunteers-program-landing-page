/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /gh/jeminids/webflow-codes@autoplay-logo_v1.0/autoplay-logo.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var source_list=$('[data-client="source"]'),target_list=$('[data-client="target"]');source_list.children().each((function(t){var e=$(this).find("img").attr("src");target_list.children().eq(t).find("img").attr("src",e)}));var source_index=target_list.children().length,target_index=0;setInterval((function(){var t=source_list.children().eq(source_index).find("img").attr("src");target_list.children().eq(target_index).find("img").fadeOut(500,(function(){$(this).attr("src",t).fadeIn(500)})),source_index++,++target_index>=target_list.children().length&&(target_index=0),source_index>=source_list.children().length&&(source_index=0);source_list.children().length}),$("[data-time]").data("time"));
//# sourceMappingURL=/sm/ec369d4646b36b12da09818ae4f65ed03d6fe3a037078c42ce628e0d1b42d721.map