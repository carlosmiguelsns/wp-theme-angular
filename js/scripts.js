var app = angular.module('app', ['ngRoute']);

//Config the route
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
        .when('/', {
		    templateUrl: myLocalized.partials + 'main.html',
		    controller: 'Main'
	    });

    $routeProvider
        .when('/:ID', {
		    templateUrl: myLocalized.partials + 'content.html',
		    controller: 'Content'
	    });
}]);

//Controllers
app.controller('Main', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/').success(function(res){
		$scope.posts = res;
	});
});

app.controller('Content', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/' + $routeParams.ID).success(function(res){
		$scope.post = res;
	});
});

//Directive
app.directive('listPosts', function getBrowser() {
    var directive = {
        restrict: 'E',
        template: tpl
    };

    return directive;

    function tpl(scope, element, attrs) {
        return '<li ng-repeat="post in posts"><a href="{{post.ID}}">{{post.title}}</a></li>';
    }
});

//Filters
app.filter('htmlToPlaintext', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gmi, '') : '';
    };
});