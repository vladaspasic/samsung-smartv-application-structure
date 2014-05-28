Basic Structure for a Smasung Smart TV App
=========

This structure can help you setup a small environment for building Samsung Smart TV Apps. Instead of using Eclipse IDE, which can be an overkill, as advised by Samsung, we can use simple text editors to write our code.

We are developing Web Apps using the Samsung Javascript API, so we can easilly configure the environment we want, and the tools that suits us.

Before we start with the instructions, I hope you have all at least tried to build an App, or read the instructions and tutorials on the Samsung Forum, on how to build Apps. If not i advise you to this before you start using this. 

It is neccessary to have at least a Samsung Tv Emulator installed on your machine to test your apps, and to have a clear idea how the Samsung Smart TV Javascrpt API works.

Instructions
----------

Before we begin, you must have a [Grunt](http://gruntjs.com/) task runner installed on your machine.

You can either download this repostory or clone it:

```sh
git clone git@github.com:vladaspasic/samsung-smartv-application-structure.git
```

My sugestion is, if you have a Samsung TV Emulator, to put this structure into a previously configured folder, where your Emulator can access the apps and it can load it in it's home screen (SmartHub).

Then run this in your aplication folder, to install all Grunt dependencies.

```sh
npm install
```

Now lets go through our folders that we now have:

- **images**: folder where all the images should be put
- **javascript**: folder where you put javascript files
- **css**: folder where you put css files

This is pretty much clear, now lets go to our ``/javascript``, where you will probably spend most of your time.

#### dist

This is the distrubution folder for all compiled scripts, Grunt is by default configred to put 2 files over there, concatenated ``app.js`` file, and ``app.min.js`` which is an uglyfied version of the ``app.js``.

#### deps
You can put javascript libraries as dependencies for your app in this folder.

If you choose to use Bower, make sure you point this folder as your vendor folder in the Bower configuration, so you would not have to change your Grunt task configuration.

#### modules
This would be your main playground. In this folder you should place all the code that should be used by the App. All the files here are picked up the Grunt taskrunner and then compiled to the **dist** folder.

In there you will notice an ``App.js``. This is the main Application file that is exposing the ``Application`` to the window scope. By default, this file is compiled last as it may require other depening modules to be declared first.

----

If you have worked before with Samsung Smart TV Apps, you would notice, that it is a pretty simple structure and very similar to the ones that Samsung has provided as demo Apps.

- **index.html** the main page that SmartHub looks for when starting the App, and probably the only html you would need
- **config.xml** Samsung TV Configuration file
- **widget.info** file that specifies the screen setting for an App
- **Gruntfile.js** Grunts main file where the tasks are configured
- **package.json** file used by node to declare dependencies, and there you must specify the App name and description

There you would also see a ``widgetlist_template.xml`` file. This is a template file for declaring your ``widgetlist.xml`` which must be located on a server and it is read by the TV in order to install your Application.

There is a Grunt ``build`` task defined, which creates this ``widgetlist.xml`` file and an ``archive.zip`` file, where your code will be packaged for the Market. Those files are stored in the ``archive`` folder of your application.

Read more about deploying and publishing your App, on Samsung Forums.

### Grunt Tasks

There are 3 main tasks declared:

- *default*
- *compile*
- *build*

#### default
This is the basicly the only tasks you would ever use in development. It is starting a ``watch`` task which observes the changes made to any file in your ``javascript`` folder, and runs a ``compile`` task.

#### compile
Compiles all your javascipt assets and uglyfies it, and then puts it in the ``javascript/dist`` folder of your application.

#### build
This task will run the ``compile`` task first to sort the assets, then it will run a ``comress`` plugin in order to create an ``archive.zip`` and ``widgetlist.xml`` file you would need when you want to go live with your application. 
