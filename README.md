# Measly

## MVP
### Chefs/Businesses
- signup
- create a profile
- create listing
- customise listing
    - categories (indian, vietnamese etc)
    - dietry (gluten free, vegetarion)
    - location
    - pickup, dropoff
- set up a schedule (when they will cook)
- have a history of things made

### Eaters
- signup
    - google
    - facebook
    - email
- view listings
- search and filter by categories, diet, location, pickup/dropoff
- view map with filtering
- make a reocurring schedule for ordering of food
- place order
- review

### Order
- information from chef and eater
- cancellation fee
- payment through QR code

### Transaction
- history of transaction



## Frontend (webapp)
- map view with nearby listings
- search filters
- wishlist
- favourites
- recently ordered
- quick order
- updates of order progression
- transactiopn history
- schedule pickup time window

## API
### Auth
- sign in with firebase
- verification firebase
- store user in DB
- user role authorisation
- middleware protect routes based on role and signed in

### Chefs
- register selling
- create listing
- set a schedule of days to cook/pickup/dropoff food
- set dish availability based on portions per day
- specify things like gluten free/vegan options
- basic inventory tracking for the chef
- decide if pickup or dropoff (increase charge if dropoff)- give this option to the buyer as well if they want to charge extra for the drop off- make some sort of amount based on proximity
- edit/delete listing
- view incoming orders
- mark order as 'prepared' or 'completed'

### Eaters
- sign up
- browse food listings
    - search/filter bar
    - interactive map
- filter by cuisine, price, location, gluten free/vegan etc
- place order
- view active and past orders
- rate and review seller after pickup

### Transactions
- integrate stripe connection
- buyer pays- funds help in escrow
- we take percentage
- funds released to seller after pickup (manual or auto)
- QR code scan on pickup (seller phone or print out) for buyer to scan and onces scanned the money from escrow goes through
- or maybe the chef has to enter a code that the buyer is given
- cancellation fee as well maybe like cant cancelled 1 day before the pickup date

### Order Management
- tracking order status- pending, preparing, ready, completed
- notifications (email/sms/in-app) order updates

### AI (future)
- recommendation on dishes to buy (purchase history, location, time of day/season)
- sentiment anaylsis- analyse reviews to detect sentiment and keywords mentioned (too spicy, great value)
- semantic search (eg spicy noodles can show noodle sellers)
- chatbot ('whats available nearby?')

## IoS

## Android


ease of setting up, where a chef write in a short description of what they want to make and AI makes a template for their lisintg- to setup

miscellanous filter for things like oranges or apples or something simple

ndis/aged care people need good food with some requirements

agreement on pickup spot

scheuling for reoccurence of meals

chf experiment with new receipe put at discount price

food safety and handling credentials
    risky one
    proper government one
    links to certificates on profile
    advertise the checks on the page


chefs get notifications about ustom cooking if they advertise they would do

if custom request by someone and chef accept they can set a portion size and other people can jump in on it so they can make it in bulk

chefs have proper profiles because they can advertise themselves as authentic culture or empathy type of stuff

ordering in advnace

creating a menu of past food and people can request that and then others jump on it etc

market stalls could use it and then people order through the app and pickup from stall- advertise the cap on how many you would make in advance and people can pre book it in advqnce and pick it up at the stall on the day

sign up through facebook

see how eat club do verefication of certificates