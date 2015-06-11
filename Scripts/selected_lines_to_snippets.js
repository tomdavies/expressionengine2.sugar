/*
Wraps currently selected lines in a text snippet

action.setup:
	- firstSnippet (string): the snippet to insert around the first line
	- followingSnippet (string): the snippet to insert around following lines
	- finalAppend (string): the final string to append (if any)
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
	var range = context.selectedRanges[0];
	// Ensure that we have a selection
	if (range.length === 0) {
		return false;
	}
	var text = context.string.substringWithRange(range);
	var first = (action.setup.firstSnippet ? action.setup.firstSnippet : '');
	var following = (action.setup.followingSnippet ? action.setup.followingSnippet : '');
	var append = (action.setup.finalAppend ? action.setup.finalAppend : '');
	// Split the text into lines, maintaining the linebreaks
	var lines = text.match(/^.*([\n\r]+|$)/gm);

	// Compile the regex for quicker action on lots of lines
	var parser = /^(\s*)(.*?)(\s*([\n\r]+)?)$/;
	// Loop over the lines and construct the snippet
	var snippet = '';
	// This is the number of snippets processed, not lines
	var snippetCount = 1;
	var content, line, segment;
	for (var i = 0, count = lines.length; i < count; i++) {
		line = lines[i];
		content = parser.exec(line);
		// Only wrap the line if there's some content
		if (content !== null && content[2] !== '') {
			// Replace $EDITOR_SELECTION with the line's content
			if (snippetCount === 1) {
				segment = first.replace('$EDITOR_SELECTION', escapeSnippetCharacters(content[2]));
			} else {
				segment = following.replace('$EDITOR_SELECTION', escapeSnippetCharacters(content[2]));
			}
			snippet += content[1] + segment + content[3];
			snippetCount++;
		} else {
			snippet += line;
		}
	}
	snippet += append;
	return context.insertTextSnippet(new CETextSnippet(snippet), 0);
};