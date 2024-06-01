---
title: A Swift Dive into the Gang of Four Design Patterns
postSlug: a-swift-dive-into-the-gang-of-four-design-patterns
slug: a-swift-dive-into-the-gang-of-four-design-patterns
pubDate: 03/27/2023 06:22 PM
imgUrl: ../../../../assets/img/2023/03/819d84793b8ae08cb193143196d191119f92e948.jpeg
ogImage: ../../../../assets/img/2023/03/819d84793b8ae08cb193143196d191119f92e948.jpeg
author: Eph Baum
featured: false
draft: false
tags:
  - relevant-tag
description:
  Placeholder description for imported post from Ghost Blog
layout: ../../../../layouts/BlogPost.astro
---

![Featured Image](../../../../assets/img/2023/03/819d84793b8ae08cb193143196d191119f92e948.jpeg)

The Gang of Four (GoF) design patterns are a collection of 23 time-tested software design patterns, introduced by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides in their seminal book "[Design Patterns: Elements of Reusable Object-Oriented Software](https://www.goodreads.com/book/show/85009.Design_Patterns)". These patterns provide a common vocabulary and best practices for software developers, making it easier to design and communicate complex systems.

Recently I was talking another engineer who was asking about things they could do to "level-up" their career and I wanted to share this topic with them but didn't find any great summaries with a simple web search. My purpose in creating this post  is that I will have a solid quick reference to share in the future.

This post was compiled from multiple resources and assembled using ChatGPT.

### Summary of Gang of Four Design Patterns

The GoF patterns are grouped into three categories:

1. Creational Patterns: Deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.
2. Structural Patterns: Concerned with object composition and the relationships between classes, aiming to simplify complex structures.
3. Behavioral Patterns: Define ways to communicate between objects, promoting flexibility and loose coupling.

* * *

### Creational Patterns

Creational patterns abstract the process of object creation, allowing the system to be more flexible and adaptive to different requirements. There are five Creational Patterns:

1. Singleton: Ensures a class has only one instance and provides a global point of access to that instance. This pattern is useful when a single shared resource is needed throughout the application, such as a configuration manager or a connection pool.
2. Factory Method: Defines an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. This pattern promotes loose coupling between the creator and the concrete products.
3. Abstract Factory: Provides an interface for creating families of related or dependent objects without specifying their concrete classes. This pattern allows the client code to work with abstract interfaces and create objects from multiple related families without knowing their concrete implementations.
4. Builder: Separates the construction of a complex object from its representation, allowing the same construction process to create different representations. This pattern is particularly useful when constructing objects with a large number of optional or interdependent attributes.
5. Prototype: Specifies the kind of objects to create using a prototypical instance and creates new objects by cloning this prototype. This pattern is useful when creating a new object is expensive or when the system needs to create objects dynamically.

* * *

### Structural Patterns

Structural patterns help in designing the composition of objects and classes, promoting reusability and maintainability. There are seven Structural Patterns:

1. Adapter: Converts the interface of a class into another interface clients expect. This pattern allows classes with incompatible interfaces to work together, providing a means to bridge the gap between existing components.
2. Bridge: Decouples an abstraction from its implementation so that the two can vary independently. This pattern helps in avoiding the proliferation of subclasses when dealing with multiple dimensions of variability in a system.
3. Composite: Composes objects into tree structures to represent part-whole hierarchies. This pattern enables clients to treat individual objects and compositions of objects uniformly, simplifying the manipulation of hierarchical data structures.
4. Decorator: Attaches additional responsibilities to an object dynamically. This pattern provides a flexible alternative to subclassing for extending functionality, as it allows adding or removing behaviors at runtime.
5. Facade: Provides a unified interface to a set of interfaces in a subsystem, simplifying access to a complex system. This pattern hides the complexities of the subsystem from the client, allowing them to interact with the system through a simplified interface.
6. Flyweight: Uses sharing to support a large number of fine-grained objects efficiently. This pattern minimizes memory usage by sharing common parts of objects, particularly useful in systems with a high number of similar objects.
7. Proxy: Provides a surrogate or placeholder for another object to control access to it. This pattern is useful in situations like controlling access to a remote object, lazy initialization, or providing a lightweight representation of a heavyweight object.

* * *

### Behavioral Patterns

Behavioral patterns specify algorithms and interactions between objects, making it easier to coordinate complex behavior in a system. There are eleven Behavioral Patterns:

1. Chain of Responsibility: Allows an object to pass a request along a chain of potential handlers until one of them handles the request. This pattern decouples the sender of a request from its receiver, giving multiple objects a chance to handle the request.
2. Command: Encapsulates a request as an object, allowing clients to parameterize objects with different requests, queue or log requests, and support undoable operations. This pattern promotes the separation of concerns between the invoker and the receiver of the command.
3. Interpreter: Defines a representation for a language's grammar and provides an interpreter to evaluate expressions in the language. This pattern is useful when a language needs to be parsed and evaluated, particularly for domain-specific languages.
4. Iterator: Provides a way to access elements of an aggregate object sequentially without exposing its underlying representation. This pattern promotes loose coupling between the collection and the clients that need to traverse it.
5. Mediator: Defines an object that encapsulates how a set of objects interact, promoting loose coupling by keeping objects from referring to each other explicitly. This pattern is useful when coordinating complex interactions and communication between related objects.
6. Memento: Captures and externalizes an object's internal state without violating encapsulation so that it can be restored later. This pattern is particularly useful when implementing undo and redo functionality or maintaining snapshots of objects.
7. Observer: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. This pattern promotes a decoupled, event-driven architecture where objects can communicate without strong dependencies.
8. State: Allows an object to alter its behavior when its internal state changes. This pattern can be used to implement state-dependent behavior in a cleaner and more organized way, avoiding large conditional statements.
9. Strategy: Defines a family of algorithms, encapsulates each one, and makes them interchangeable. This pattern enables clients to select an algorithm at runtime, promoting flexibility and separation of concerns.
10. Template Method: Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses. This pattern promotes code reuse and allows subclasses to redefine certain steps of the algorithm without changing its overall structure.
11. Visitor: Represents an operation to be performed on elements of an object structure, allowing new operations to be added without modifying the classes on which they operate. This pattern is useful when the object structure is stable but the operations to be performed on it may change or evolve over time.

* * *

The Gang of Four design patterns have stood the test of time as a valuable resource for software developers. By providing a common vocabulary and best practices, these patterns enable developers to design and communicate complex systems more effectively. To summarize, the GoF patterns can be grouped into three categories:

1. Creational Patterns: Focus on object creation mechanisms, promoting flexibility and adaptability.
2. Structural Patterns: Deal with object composition and class relationships, simplifying complex structures.
3. Behavioral Patterns: Define ways to communicate between objects, encouraging flexibility and loose coupling.

It is important to note that design patterns are not one-size-fits-all solutions. Developers should use them judiciously, understanding the specific problem at hand and applying the appropriate pattern to address it. By leveraging these patterns, developers can create more maintainable, reusable, and efficient software systems.

We hope this quick overview of the Gang of Four design patterns has been helpful in understanding their role and application in software development. Keep exploring and experimenting with these patterns to improve your software design skills and build more robust and flexible systems. Happy coding!
