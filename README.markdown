# expressionengine2 Espresso Sugar

**This sugar has been converted from [Anthony Short's](https://github.com/anthonyshort/) [ee1 sugar](https://github.com/anthonyshort/expressionengine.sugar) - the majority of the work is his, (though I *think* he in turn converted it from the [EE TextMate bundle](http://www.chrisruzin.net/entry/textmate_expressionengine_bundle/) ). All this version does is update that sugar to work with ee2 and rename things so that it plays nice with the ee1 sugar, and add a few extra snippets. It almost certainly contains the odd bug - if you find one please do open an issue or pull request...**

This sugar gives you access to the ee2 template syntax within [Espresso](http://macrabbit.com/espresso/), giving you codesense, itemizers and more. 

## Espresso 2 Kaboom/alpha compatibility 

Initial testing with [Espresso 2 Kaboom (alpha 4)](http://macrabbit.com/espresso/2/) suggests that everything essentially works except for the TEA powered *documentation for tag* functionality. I plan to re-write this once the new JavaScript-based system for user actions has some documentation available.

## Download and Install

### Via Git (for easy updates)

- open a terminal session
- `cd ~/Library/Application Support/Espresso/Sugars/`
- `git clone git://github.com/tomdavies/expressionengine2.sugar.git`
            
### Manually

- Use the download link at the top of the page
- Rename the folder that downloads to "expressionengine2.sugar"
- Double click the sugar and it's installed. 
	
## Theme

Themed to match [Anthony Short's quiet night theme](http://github.com/anthonyshort/quiet-night.foam/tree/master). Edit `PlaceHolderThemes/ExpressionEngine2.css` if for some reason you like to code on a blinding white background.
	
## Known Bugs

- There are duplicate auto completes in the drop-down menu. This will be fixed soon, but is there as I am getting the sugar ready to do tag-sensitive auto completes. 

## To Dos

### New
- Housecleaning updates of codesense and snippets
- Integrate some of the interesting stuff from https://github.com/wesbaker/ExpressionEngine2.tmbundle

### From ee1 sugar

- Text Actions
- File Actions
- Common Formatting dates in the codesense
- IP to Nation
- Referrer Tag
- RSS Tag
- Trackback Tag
- Simple Commerce
- Common Plugins