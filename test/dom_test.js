load('riot.js');
Riot.require('../turing.core.js');
Riot.require('../turing.dom.js');
Riot.require('../turing.alias.js');

Riot.context('turing.dom.js', function() {
  given('a selector to tokenize', function() {
    should('return class for .link', turing.dom.tokenize('.link').finders()).equals(['class']);
    should('return class and name for a.link', turing.dom.tokenize('a.link').finders()).equals(['name and class']);
  });

  given('a selector to search for', function() {
    should('find with id', turing.dom.get('#dom-test')[0].id).equals('dom-test');
    should('find with id and name', turing.dom.get('div#dom-test')[0].id).equals('dom-test');
    should('find with tag name', turing.dom.get('a')[0].innerHTML).equals('Example Link');
    should('find with tag name', turing.dom.get('p')[0].innerHTML).equals('Text');
    should('find a link', turing.dom.get('#dom-test a.link')[0].innerHTML).equals('Example Link');
    should('find a class name by itself', turing.dom.get('.example1')[0].nodeName).equals('DIV');
    should('find a nested link', turing.dom.get('div#dom-test div p a.link')[0].innerHTML).equals('Example Link');
    should('find a nested tag', turing.dom.get('.example3 p')[0].innerHTML).equals('Text');
    should('find a nested tag', turing.dom.get('.example3 p').length).equals(1);
  });

  given('a selector that does not match anything', function() {
    should('not find anything', turing.dom.get('div#massive-explosion .failEarly p.lease')).equals([]);
  });

  given('chained DOM calls', function() {
    should('find a nested tag', turing('.example3').find('p').length).equals(1);
  });

  given('a nested element', function() {
    var element = turing.dom.get('#dom-test a.link')[0];
    should('find elements with the right selector', function() {
      return turing.dom.findElement(element, '#dom-test a.link', document);
    }).equals(element);

    should('not find elements with the wrong selector',function() {
      return turing.dom.findElement(turing.dom.get('#dom-test .example1 p')[0], 'a.link', document);
    }).equals(undefined);
  });
});

Riot.run();

