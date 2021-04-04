# Modal window

modal.js is based on a module design pattern and it creates a modal window with style described in modal.css

## Features

modal.js has one open method which is called **createModal**. The created modal window has some methods:

* open - this method makes a modal window visible by adding a css class **open**
* close - this method removes the css class **open**
* setContent - sets the content of a modal window
* setTitle - sets the title of a modal window

confirmModal uses a modal.js for temporary modal windows
