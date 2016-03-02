# A Better Test System

After working on a number of projects I've observed a constant tension on the topic of *end to end tests* or *system tests*. This tension comes from:

* Coverage vs Speed
* Inefficient, tests re-run the same steps to make a different assertion
* Confidence in lower level tests
* Difficulty in changing
  * Often slow, so testing a change can be time consuming
  * Requires good up-front organisation, with ongoing widespread understanding of organisation to stem the test proliferation problem.
  * Difficult to know which tests are similar without sitting and reading each test
* Difficult/manual to tailor suite for different purposes i.e. smoke check, happy path, high value or regression.



