/**
 * Wraps the currently selected ranges in a common tag
 */

/*
escapeSnippetCharacters

Arguments:
	- text (string)

Returns the string with special characters escaped for safe use in a snippet
*/
var escapeSnippetCharacters = function(text) {
	return text.replace(/([${}`\\])/g, '\\$1');
};

action.performWithContext = function(context, outError) {
	// Special case if we don't have a selection
	if (context.selectedRanges[0].length === 0) {
		return context.insertTextSnippet(new CETextSnippet('{${1:exp:}}$0{/${1/\\s.*//}}'));
	}
	// Grab our first range and setup initial snippet
	var firstRange = context.selectedRanges[0],
		lastRange = firstRange,
		snippet = '{${1:exp:}}' + escapeSnippetCharacters(context.substringWithRange(firstRange)) + '{/${1/\\s.*//}}',
		prevRange, interimIndex;
	// Loop across our ranges, and construct our entire snippet
	for (var i = 1, count = context.selectedRanges.length; i < count; i++) {
		prevRange = context.selectedRanges[i-1];
		interimIndex = prevRange.location + prevRange.length;
		lastRange = context.selectedRanges[i];
		// Add the text between our previous range and this one
		snippet += escapeSnippetCharacters(context.substringWithRange(new Range(interimIndex, lastRange.location - interimIndex)));
		// Add our new snippet portion
		snippet += '{${1:exp:}}' + escapeSnippetCharacters(context.substringWithRange(lastRange)) + '{/${1/\\s.*//}}';
	}
	
	// Figure out full range we are replacing and do the deed
	var target = new Range(firstRange.location, lastRange.location + lastRange.length - firstRange.location);
	context.selectedRanges = [target];
	return context.insertTextSnippet(new CETextSnippet(snippet), CETextOptionVerbatim);
};