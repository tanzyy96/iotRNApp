# CZ4171 React Native Handwriting Recognition
This is an Expo app that connects to Microsoft Azure VM to perform handwriting recognition. The model and UI is very basic.

# How can I setup my own Azure App?
1. Go to Azure and create your own VM
2. Note your VM's IP address
3. Enable a port for your app to run on e.g. 5000
4. Using iTerm (or wtv you use to ssh), ssh into the VM `ssh myusername@my.ip.address`
5. Upload your server to the VM, either through git or `scp`. As you can see, I'm using Python Flask.
6. Run your your server. Remember to expose it to the internet. Flask does this by indicating the host number like this `flask run --host='0.0.0.0'

# How can I setup and connect my React Native app to my VM?
1. Run the app locally, either via simulator or physical device
2. Make POST requests to your VM server using its IP address e.g. http://200.50.50.50/receive?truth=yes


# References
- https://github.com/jayeszee/rn-draw
- https://github.com/tanzyy96/SimpleHTR
