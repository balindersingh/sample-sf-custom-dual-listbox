# Sample LWC component to use Custom Listbox LWC for Salesforce
An SFDX project has an LWC component which use a Custom Listbox LWC for Salesforce (Unlocked package)

# Pre-Requisite
* Install Custom Listbox Unlocked package [Version 0.2](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t5e0000012CetAAE)

## Some development commands
* create a new scratch org
```sfdx force:org:create -f config/project-scratch-def.json -a <orgAliasOrUsername> --setdefaultusername```
```sfdx force:org:create -f config/project-scratch-def.json -a <orgAliasOrUsername> --nonamespace```
* Generate password
```sfdx force:user:password:generate -u <orgAliasOrUsername>```
* Display org info
```sfdx force:user:display -u <orgAliasOrUsername>```
* Delete a scratch org
```sfdx force:org:delete -u <orgAliasOrUsername>```
* To list all active / inactive orgs
```sfdx force:org:list --all```
* Deploy source code to scratch org
```sfdx force:source:push -u <orgAliasOrUsername>```
* Make changes to the components
* Pull the changes from scratch org to code
```sfdx force:source:pull -u <orgAliasOrUsername>```
