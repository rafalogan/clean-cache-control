/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],

  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  moduleNameMapper: {
  	'@/(.*)': '<rootDir>/src/$1'
	},
  roots: [
    "<rootDir>/src"
  ],

  testEnvironment: "node",
  transform: {
  	'.+\\.ts$': 'ts-jest'
	},

	coverageThreshold: {
		global: {
			branch: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	},
};
