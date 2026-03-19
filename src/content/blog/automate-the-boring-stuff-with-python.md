---
title: "Automate the boring stuff with Python"
description: "Personalizing your cover letter can be daunting at times, imagine you're sending hundreds of job applications per week, look at how frustrated the guy in the image below is: I was like this guy, but things became easy for me when I started putting m..."
publishedAt: "2021-09-26T16:56:39.017Z"
featured: false
sourceName: "Hashnode"
sourceUrl: "https://thecodezs.hashnode.dev/automate-the-boring-stuff-with-python"
tags:
  - "Python"
  - "Productivity"
  - "job search"
  - "python beginner"
  - "#beginners #learningtocode #100daysofcode"
---

> Originally published on [Hashnode](https://thecodezs.hashnode.dev/automate-the-boring-stuff-with-python).

Personalizing your cover letter can be daunting at times, imagine you're sending hundreds of job applications per week, look at how frustrated the guy in the image below is:

![howtofrustrated.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1632607037269/0AkqExUep.jpeg)

I was like this guy, but things became easy for me when I started putting my python skills into practice, I'm not saying you shouldn't go several miles to edit your cover letter but automating the process can make things easy for you, I was like a magician the first time I tried it.

### The way I do things before that wasted a lot of my time:

- Locate my master template file: 30 seconds

- Open the file: 5 seconds

- Find where the companies names are and replace them: 60 seconds

- Find where the names of the positions are and replace them: 45seconds

- Change the date: 10 seconds

- Save the file: 20 seconds


Imagine I repeat this process for more than 50 companies, the whole day has gone by already. This article will teach you how to automate this boring process and save you time.

### What do we need?

1. Python with a package manager
2. Your favorite code editor
3. Create a folder, then create a Python file, name it anything you want,
then move your master cover letter to the folder.


### Setting up our Packages

We'll be using only one python package here called [python-docx-template](https://docxtpl.readthedocs.io/en/latest/), it's for creating documents but not for modifying them. It can be as complex as you want: pictures, index tables, footer, header, variables, anything you can do with Msword, but we're focusing on text in this tutorial.

Let’s use pip to install the package.
```
pip install docxtpl
``` 

### Our Master Cover Letter

Let's use this cover letter template I got from  [Indeed.com](https://www.indeed.com/career-advice/cover-letter-samples/software-developer) as an example. We'll modify the cover letter and replace all instances of date, company name, and position by their respective variables with double curly braces.

##### Let’s replace the variables


- Replace May 1, 2018 with {{ today_date }}

- Replace Software Developer with {{ position_name }}

- Replace Cloud Clearwater with {{ company_name }}


Save the word document as my_cover_letter.docx. You should have a docx file that looks like this:


```
Sofia Flores
(123) 456 7891
sflores@email.com
{{ today_date }}

Dear Hiring Manager,
I'm excited to be applying for the {{ position_name }}  position at 
{{ company_name }}. With software development, there is always 
something new to discover. Designing a program that is truly helpful
to the user is my ultimate goal on every project, and I am delighted
by the opportunity to apply my knowledge at {{ company_name }},
a top provider of cloud services.

During my previous role at River Tech, I provided support for a 
role-oriented parts management system that allowed the users 
to track parts, jobs, tasks, statistics, and other job and employee 
data. This system is utilized by an Air Force depot to track all progress
 on the parts and labor required to repair and supply airplanes. 

As part of my duties, I provided enhancements to the program 
and also provided immediate solutions to unexpected problems. 
When I was appointed to design an online version of the hardcopy
workbook used by the maintenance and repair technicians for job 
tracking, I successfully led the team in certain tasks and followed 
the direction of the team leader for other requirements. The 
implementation of the online workbook resulted in a 25% faster 
completion time for measurable tasks the following year. 

Thank you for your time and consideration. I'm looking forward to 
learning more about the {{ position_name }}   position and about 
{{ company_name }}. As a {{ position_name }}, my goal is to continually
increase my programming skills to present better solutions to my 
employers and their clients. I enjoy uncovering new ideas and 
would use them to advance {{ company_name }} mission to deliver viable
solutions for digital storage.

Sincerely,
Sofia Flores

``` 

### The Code

Our code will be simple, short, and very straightforward. We'll first make sure we get the user input for the name of the company and the position you will be applying for.

Let’s import the packages first.


```
from docxtpl import DocxTemplate
import datetime
``` 
Now let’s go ahead and get the user inputs. This means the code will be interactive and will ask you to provide the name of the position you're applying for and the company you're applying to. We're going to wrap our code with a function to print a successful message at the end of the code. 

*Note: I love using functions because they are reusable.*


```
def gen_cv():
     company_name = input("Enter name of the Company : ") 
     position_name = input("Enter name of the Position: ")
``` 

Now a formatted today’s date. We will use British format 
(dd/mm/yyyy).


```
    today_date = datetime.datetime.today().strftime('%d/%m/%Y')
``` 

Now, let’s create a dictionary called elements that will tell our program about the values of company_name, position_name, and today_date.


```
 elements = {
 'today_date': today_date,
 'company_name': company_name,
 'position_name': position_name
  }
``` 

The final step is to load our master cover letter, replace the variables with our values and automatically generate and save a personalized cover letter. Then add print, and call the function.


```
# This open our master template
    doc = DocxTemplate("my_cover_letter.docx")

# This get and load them up
    doc.render(elements)

# This save the file with personalized filename
    doc.save('Cover_letter_'+company_name+'_'+position_name+'.docx')

#success message
    print('Resume generated successfully')


gen_cv()

``` 

Your code should look like this.


```
from docxtpl import DocxTemplate
import datetime


def gen_cv():

    company_name = input("Enter name of the Company : ")
    position_name = input("Enter name of the Position: ")

    today_date = datetime.datetime.today().strftime('%d/%m/%Y')

    elements = {'today_date': today_date,
               'company_name': company_name,
               'position_name': position_name
               }

# This open our master template
    doc = DocxTemplate("my_cover_letter.docx")

# This get and load them up
    doc.render(elements)

# This save the file with personalized filename
    doc.save('Cover_letter_'+company_name+'_'+position_name+'.docx')

#success message
    print('Resume generated successfully')


gen_cv()

``` 

### Generating your Cover Letter


- Open terminal

- Navigate to the folder where your Python file is.

- Type python3 then your python name or however your folder is setup


- You will now get 2 prompts to enter the company_name and position_name respectively. Enter those values.

- You now have a personalized cover letter for your job application. It will be saved inside the same folder where your python file is. 

You should get a message in your terminal that looks like this:


![Success.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1632674536039/BWQgInXsVS.png)

 [Click here to view the code on GitHub](https://github.com/kennyOlakunle/Automate-the-boring-stuff-with-Python) 


> That’s it friends. Happy job hunting!

### Resources

 [Python-docx-template’s documentation!](https://docxtpl.readthedocs.io/en/latest/#) 

 [Automate the Boring Stuff with Python by By Al Sweigart](https://automatetheboringstuff.com/) 

 [Python Tutorial](https://www.tutorialspoint.com/python/index.htm)
