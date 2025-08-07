<script>
    // Assignment 1: Declare a variable and initialize it with your name
    let name = "Alice";

    // Assignment 2: Create an array of your favorite colors
    let colors = ["red", "green", "blue"];

    // Assignment 3: Write a function that returns the length of the colors array
    function getColorsCount() {
        return colors.length;
    }

    // Assignment 4: Create an object representing a person with properties: name, age, and city
    let person = {
        name: "Alice",
        age: 25,
        city: "New York"
    };

    // Assignment 5: Write a function to update the person's age by adding 1
    function increaseAge() {
        person.age += 1;
    }

    let hobbies = ["reading", "gaming", "running"];

    function addHobby(x){
        hobbies.push(x);
    }
</script>

<h1>Hello, {name}!</h1>

<p>Your favorite colors are:</p>
<ul>
    {#each colors as color}
        <li>{color}</li>
    {/each}
</ul>

<p>Number of favorite colors: {getColorsCount()}</p>

<p>Person Info:</p>
<ul>
    <li>Name: {person.name}</li>
    <li>Age: {person.age}</li>
    <li>City: {person.city}</li>
</ul>

<p>Your hobbies are:</p>
<ul>
    {#each hobbies as hobby}
        <li>{hobby}</li>
    {/each}
</ul>

<button on:click={increaseAge}>
    Increase Age
</button>


---

<!-- Your Turn! -->

<!-- Assignment 6:
  Add a new variable 'hobbies' as an array of 3 hobbies.
  Create a function 'addHobby' that adds a new hobby to the hobbies array.
  Display the list of hobbies on the page.
  Add a button that, when clicked, calls 'addHobby' to add a new hobby of your choice.
-->