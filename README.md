# Description
Sample ionic 4/angular/cordova application to demo uploading files to AWS S3

# Prerequisities   
* [Git](http://git-scm.com/) and [Source Tree](https://www.sourcetreeapp.com/) to manage sources - see the installation instructions on the site
* [Node.js](http://nodejs.org/) - install the latest LTS node version (for example, node 12.15.0 - see the installation instructions on the site)   
NOTE: It is recommended to install and use nvm (see https://github.com/creationix/nvm) and install node 12.15.0 by issuing `nvm install v12.15.0`
* Switch to node 12.15.02 by issuing nvm use 12.15.0 (you may want to make this default node version)   
* [Cordova](https://cordova.apache.org/) - install cordova cli version 9.0.0 by issuing `npm install -g cordova@9.0.0`   
* [Ionic CLI](http://ionicframework.com/docs/cli/install.html) - install the latest stable ionic cli version (for example, 6.0.1 by issuing commands `npm install -g ionic@6.0.1')
* [native-run](https://github.com/ionic-team/native-run) - install native-run utility version 0.3.0 by issuing `npm i -g native-run@0.3.0`   
* If you plan to build and publish the app to Google Play Market and Apple Store please:
    * for Android please install the required software - see https://cordova.apache.org/docs/en/latest/guide/platforms/android/#installing-the-requirements and create Google Developer account (see Android Publishing section at https://ionicframework.com/docs/guide/publishing.html)
    + for iOS please:
        * install [XCode](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/#xcode)
        * create Apple developer account and configure/set up provisioning profile (see iOS Publishing section at https://ionicframework.com/docs/guide/publishing.html)
        * install CocoaPod as describe here (CocoaPod installation instructions)(https://github.com/phonegap/phonegap-plugin-push/blob/master/docs/INSTALLATION.md#ios-details). This is required for phonegap-plugin-push

# Instructions
## Initial setup
1. clone the source code repository (will be referenced as <Git> below)
2. change to project repository directory (the directory where you cloned the repo)   
3. Execute the command `npm install` 
4. Execute the command `ionic cordova prepare`   
5. Make the necessary configuration to XCode project. To do so please:   
   5.1. Change to <Git>\src\platforms\ios directory   
   5.2. open XCode project by clicking BOSS811.xcworkspace file   
   5.3. make sure that Info in XCode project has the description for all the permissions used by the application      
5.6. Make sure that Deployment Target set to 11.0 (this is required for WKWebView support)   
6. Run Ionic:  
   - `ionic serve` to test on the browser     
   - `ionic cordova run android` to build and run on an Android device
   - `ionic cordova prepare ios` to build and then start the appropriate XCode workspace and build/run on an iOS device
    * make sure that all icons/splash screens have been correctly set up (replace default ionic UI assets if required)   