VERSIONS = {
    # This should match the version in `.ruby-version`
    # It must also be availble, and preferably the default here:
    #  https://github.com/netlify/build-image/blob/focal/included_software.md
    "python": "3.10",
    "aspect_bazel_lib": {
        "type": "github_archive",
        "repo": "aspect-build/bazel-lib",
        "version": "8d3c941c6499626376d2a1e3e01e05f3e1ec6856",
        "sha256": "1b1da9d7d58b83ae47e7f15f1dd6c5033f84bc2b5ad65226fa745861b2204d91",
        "url": "https://github.com/{repo}/archive/{version}.tar.gz",
        "strip_prefix": "bazel-lib-{version}",
    },
    "com_github_twbs_bootstrap": {
        "type": "github_archive",
        "repo": "twbs/bootstrap",
        "version": "5.1.3",
        "sha256": "55b951db46e1d69b4236494122fe559716a76c4b8a418c11f3fed6abc2d4de3f",
        "url": "https://github.com/{repo}/archive/refs/tags/v{version}.tar.gz",
        "strip_prefix": "bootstrap-{version}",
        "build_file": "@envoy-website//bazel:bootstrap.BUILD",
    },
    "envoy": {
        "type": "github_archive",
        "repo": "envoyproxy/envoy",
        "version": "515bb2d5b29b996ce18a868220bac7e883d2d8ae",
        "sha256": "61b2f1ffc0d75d4acc9a3f25088f8189ab40540e85f91521683c8507398184b2",
        "url": "https://github.com/{repo}/archive/{version}.tar.gz",
        "strip_prefix": "envoy-{version}",
    },
    "envoy_archive": {
        "type": "github_archive",
        "repo": "envoyproxy/archive",
        "version": "996e7058b34bbf192ec68ae1d478b5d32a143841",
        "sha256": "0e4c511a7b6b5e2a548c5eec1d096443e3a69dfbd6b11721189034592040b428",
        "url": "https://github.com/{repo}/archive/{version}.tar.gz",
        "patch_args": ["-p1"],
        "strip_prefix": "archive-{version}",
    },
    "envoy_toolshed": {
        "type": "github_archive",
        "repo": "envoyproxy/toolshed",
        "version": "0.0.11",
        "sha256": "89364302f38864370d7a380a15974b44b646e616ecf7b80f04aa0e44cb4f8a2f",
        "url": "https://github.com/{repo}/archive/bazel-v{version}.tar.gz",
        "strip_prefix": "toolshed-bazel-v{version}/bazel",
    },
}
