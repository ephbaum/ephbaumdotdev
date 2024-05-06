---
title: Thinking S.R.P. in S.O.L.I.D.
postSlug: thinking-srp-in-solid
slug: thinking-srp-in-solid
pubDate: 09/15/2023 01:20 PM
imgUrl: ../../../../assets/img/2023/09/2727558efa4bb78f2658c48990c84e0e011b6079.jpeg
ogImage: ../../../../assets/img/2023/09/2727558efa4bb78f2658c48990c84e0e011b6079.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/09/2727558efa4bb78f2658c48990c84e0e011b6079.jpeg)

You're no doubt familiar with SOLID, a set of guiding design principles for OOP meant to help create more maintainable and scalable software. I was recently talking with someone who was having a hard time understanding SRP in practice. I figured they probably weren't alone as I recall having not quite "getting it" when first learning these concepts.

What is SOLID?
--------------

First, however, a refresher, with examples, in case you're not familiar:

**S - Single Responsibility Principle (SRP)**: This principle states that a class should have only one reason to change. In other words, a class should have only one responsibility or job. This helps in keeping classes focused and makes the code easier to maintain and understand.

Example: Consider a class called `FileHandler` that reads data from a file and also formats the data. This class violates the SRP because it has two responsibilities: file I/O and data formatting.

    class FileHandler {
        public function readFile($filename) {
            // Read data from the file
        }
    
        public function formatData($data) {
            // Format the data
        }
    }
    

To follow the SRP, you can separate these responsibilities into two classes: one for file handling and another for data formatting.

**O - Open/Closed Principle (OCP)**: The Open/Closed Principle suggests that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. In practice, this means that you should be able to add new functionality to a system without altering existing code.

Example: Suppose you have a `Shape` class with a method to calculate area. To add support for new shapes like circles without modifying the `Shape` class, you can use inheritance and create a new class for each shape.

    class Shape {
        public function calculateArea() {
            // Calculate area for a generic shape
        }
    }
    
    class Circle extends Shape {
        public function calculateArea() {
            // Calculate area specifically for circles
        }
    }
    

This way, you can extend functionality without altering the existing `Shape` class.

**L - Liskov Substitution Principle (LSP)**: The Liskov Substitution Principle states that objects of a derived class should be able to replace objects of the base class without affecting the correctness of the program. In simpler terms, derived classes should be substitutable for their base classes without causing issues.

Example: If you have a `Bird` base class with a `fly` method, derived classes like `Penguin` should be able to inherit from it without breaking expectations. Even though penguins can't fly, they can still be considered birds.

    class Bird {
        public function fly() {
            // Common flying behavior
        }
    }
    
    class Penguin extends Bird {
        // No fly method, but still inherits from Bird
    }
    

Clients should be able to use `Penguin` objects wherever they expect a `Bird`.

**I - Interface Segregation Principle (ISP)**: The Interface Segregation Principle emphasizes that clients should not be forced to depend on interfaces they do not use. In other words, it's better to have several smaller and more specific interfaces rather than one large, monolithic interface.

Example: Suppose you have an `Worker` interface with methods for both `work` and `takeBreak`. Some workers, like robots, don't need breaks.

    interface Worker {
        public function work();
        public function takeBreak();
    }
    
    class HumanWorker implements Worker {
        // Both work and takeBreak methods implemented
    }
    
    class RobotWorker implements Worker {
        public function work() {
            // Implement work behavior
        }
        
        // No need to implement takeBreak
    }
    

Instead, create a separate `Breakable` interface for those who need breaks and implement it selectively.

**D - Dependency Inversion Principle (DIP)**: The Dependency Inversion Principle promotes two main ideas: high-level modules should not depend on low-level modules, both should depend on abstractions (e.g., interfaces or abstract classes); and abstractions should not depend on details, but details should depend on abstractions. This principle encourages the use of dependency injection and inversion of control (IoC) to decouple components.

Example: Consider a `LightSwitch` that turns on a light. Instead of directly depending on a concrete `LightBulb` class, it depends on an abstract `Light` interface.

    interface Light {
        public function turnOn();
    }
    
    class LightBulb implements Light {
        public function turnOn() {
            // Implementation to turn on a light bulb
        }
    }
    
    class LightSwitch {
        private $light;
    
        public function __construct(Light $light) {
            $this->light = $light;
        }
    
        public function flipSwitch() {
            $this->light->turnOn();
        }
    }
    

By depending on `Light` rather than a specific implementation, you can easily switch to a different type of light source without modifying `LightSwitch`.

By adhering to the S.O.L.I.D. principles, developers can create more modular, flexible, and maintainable code, which is essential for building robust and scalable software systems. These principles are widely regarded as best practices in the field of object-oriented programming.

So, how does SRP work if no class can do more than one thing?
-------------------------------------------------------------

Sticking with the example above we can delve deeper into how the Single Responsibility Principle (SRP) works, using the example of a class that needs to both read a file and format data.

The Single Responsibility Principle states that a class should have only one reason to change. In other words, it should have a single responsibility or job. This principle helps in keeping code focused, maintainable, and easier to understand.

In the context of a class that needs to both read a file and format data, here's how SRP can be applied:

**Initial Design with Violation of SRP**:

Let's start with a class called `FileHandler` that reads data from a file and formats the data. Initially, this class violates SRP because it has two responsibilities: file I/O and data formatting. Here's an example of such a class:

    class FileHandler {
        public function readFile($filename) {
            // Read data from the file
        }
    
        public function formatData($data) {
            // Format the data
        }
    }
    

In this design, if there's a change in how data is formatted or if there are changes in the file reading logic, this single class needs to be modified. This violates SRP because it has multiple reasons to change.

**Applying SRP with Separation of Concerns**:

To adhere to SRP, we should separate the responsibilities of file reading and data formatting into two distinct classes. For example:

    class FileReader {
        public function readFile($filename) {
            // Read data from the file
        }
    }
    
    class DataFormatter {
        public function formatData($data) {
            // Format the data
        }
    }
    

Now, the `FileReader` class is responsible solely for file I/O operations, and the `DataFormatter` class is responsible exclusively for data formatting. Each class has a single responsibility and a single reason to change.

**Using the Separated Classes**:

When you need to read a file and then format the data, you can now use these two classes together:

    $fileReader = new FileReader();
    $dataFormatter = new DataFormatter();
    
    $data = $fileReader->readFile($filename);
    $formattedData = $dataFormatter->formatData($data);
    

With this separation of concerns, you can modify the file reading logic or data formatting logic independently without affecting the other component. This makes your code more maintainable and easier to extend.

By adhering to the Single Responsibility Principle, you create classes that are focused on a specific task, making your codebase more modular, easier to test, and less prone to unexpected side effects when changes are made.

### So, where can we implement both FileReader and DataFormatter without violating this principle?

You raise a valid point! While applying the Single Responsibility Principle (SRP) by creating separate classes for file reading and data formatting can make individual classes more focused and maintainable, the question arises: where should these classes be used? Won't the calling class potentially violate SRP in the same way?

The key to understanding SRP in this context is to consider the responsibilities of the classes at different levels:

**Low-Level Classes**:

*   `FileReader`: This class is responsible for low-level file I/O operations, such as reading a file's contents. It encapsulates the complexities of dealing with file handling.
*   `DataFormatter`: This class is responsible for low-level data formatting operations, such as converting raw data into a specific format.

**High-Level Classes (or Business Logic)**:

*   Calling classes at the high level of your application should be responsible for orchestrating the interactions between these low-level classes.
*   These high-level classes should have their own single responsibility, which typically involves managing the business logic of your application or a specific feature.

Here's how it works:

**High-Level Class (Example):**

    class DataProcessingService {
        private $fileReader;
        private $dataFormatter;
    
        public function __construct(FileReader $fileReader, DataFormatter $dataFormatter) {
            $this->fileReader = $fileReader;
            $this->dataFormatter = $dataFormatter;
        }
    
        public function processFile($filename) {
            $data = $this->fileReader->readFile($filename);
            $formattedData = $this->dataFormatter->formatData($data);
    
            // Perform additional high-level processing, e.g., save to a database.
        }
    }
    

In this example:

*   `DataProcessingService` is a high-level class responsible for orchestrating the processing of data.
*   It depends on the low-level `FileReader` and `DataFormatter` classes.
*   `DataProcessingService` has a single responsibility at the high level, which is processing data, and it delegates the low-level file reading and data formatting tasks to the respective classes.

The key is that while the high-level class may use multiple low-level classes, it should still have a single, high-level responsibility. In this case, it's orchestrating data processing.

### The Service Layer

In many software architecture patterns, high-level classes responsible for the business logic and orchestration of application functionality are often referred to as the "service layer" or "service classes." The service layer is a common architectural component that abstracts the underlying data access and performs various operations, often encapsulating the core business logic of an application.

Here are some characteristics of the service layer:

**Business Logic**: Service classes contain the core business logic of an application. They coordinate the actions and operations required to achieve specific business goals.

**Abstraction**: The service layer abstracts away the details of data access and manipulation. It interacts with data access objects or repositories to fetch, modify, or store data.

**Reusability**: Service classes are designed for reusability. They can be called from different parts of the application, such as controllers in a web application, without duplicating the business logic.

**Separation of Concerns**: They help maintain the separation of concerns in the application architecture. Service classes handle business logic independently of data access or presentation concerns.

**Transaction Management**: In many cases, service classes are responsible for managing transactions, ensuring that a series of related operations either succeed or fail as a whole.

**Testability**: Because the business logic is concentrated in the service layer, it's easier to write unit tests for these classes, helping ensure the correctness of application behavior.

In web applications, for example, the service layer often sits between the presentation layer (controllers or handlers) and the data access layer (repositories or data access objects). It receives requests from the presentation layer, processes them using the application's business logic, interacts with the data access layer to retrieve or update data, and then returns results to the presentation layer.

The use of a service layer promotes a cleaner and more organized architecture, making it easier to maintain, extend, and test the application. It also helps adhere to principles like the Single Responsibility Principle (SRP), as it allows for the separation of concerns between different layers of the application.

In conclusion by structuring your application this way, you maintain SRP at both the low-level and high-level classes. Each class has its own specific responsibility, and high-level classes delegate tasks to lower-level classes, ensuring that each class has a clear and distinct role in the application. This separation of concerns makes your codebase more modular and maintainable.
